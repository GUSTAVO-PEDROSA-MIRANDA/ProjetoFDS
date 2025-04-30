from django.http import HttpResponse
from .models import Comentario, Filmes, Favorito
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.contrib import messages

def homeAdmin(request):
    return render(request, 'homeAdmin.html')

def homeUser(request):
    return render(request, 'homeUser.html')

def login_view(request):
    if request.method == 'POST':
        try:
            nomeBD = request.POST.get('nome')
            senhaBD = request.POST.get('senha')
            user = authenticate(request, username=nomeBD, password=senhaBD)

            if user is not None:
                auth_login(request, user)
                if user.is_superuser:
                    return redirect('homeAdmin')
                else:
                    return redirect('homeUser')
            else:
                mensagem = "Nome de usuário ou senha inválidos."
                return render(request, 'login.html', {'mensagem': mensagem, 'tipo_mensagem': 'error'})
        except Exception as e:
            print("Erro na view de login:", e)
            mensagem = "Erro interno no servidor."
            return render(request, 'login.html', {'mensagem': mensagem, 'tipo_mensagem': 'error'})

    return render(request, 'login.html')

def cadastro(request):
    if request.method == 'POST':
        nome = request.POST.get('nome')
        email = request.POST.get('email')
        senha = request.POST.get('senha')
        confirmar_senha = request.POST.get('confirmarSenha')
        is_admin = request.POST.get('is_admin') == 'on' 

        if not nome or not email or not senha or not confirmar_senha:
            return render(request, 'cadastro.html', {
                'mensagem': 'Todos os campos são obrigatórios.',
                'tipo_mensagem': 'error'
            })

        if senha != confirmar_senha:
            return render(request, 'cadastro.html', {
                'mensagem': 'As senhas não coincidem.',
                'tipo_mensagem': 'error'
            })

        if User.objects.filter(username=nome).exists():
            return render(request, 'cadastro.html', {
                'mensagem': 'Nome já está em uso.',
                'tipo_mensagem': 'error'
            })
        try:
            user = User.objects.create_user(
                username=nome,
                email=email,
                password=senha
            )
            if is_admin:
                user.is_superuser = True
                user.is_staff = True
            user.save()
        except Exception as e:
            print(f"Erro ao criar usuário: {e}")
            return render(request, 'cadastro.html', {
                'mensagem': 'Erro ao criar usuário.',
                'tipo_mensagem': 'error',
            })
        
        return render(request, 'cadastro.html', {
            'mensagem': 'Cadastro realizado com sucesso!',
            'tipo_mensagem': 'success',
            'is_admin': is_admin,
        })

    return render(request, 'cadastro.html')

@login_required
def filmes(request):
    if request.method == 'POST':
        titulo = request.POST.get('titulo', '').strip()
        diretor = request.POST.get('diretor', '').strip()
        ano = request.POST.get('ano', '').strip()
        genero = request.POST.get('genero', '').strip()
        tipo = request.POST.get('tipo', '').strip()
        sinopse = request.POST.get('sinopse','').strip()

        if not titulo or not diretor or not ano or not genero or not tipo or not sinopse:
            mensagem = "Todos os campos são obrigatórios!"
            return render(request, 'adcFilmeAdmin.html', {'mensagem': mensagem, 'tipo_mensagem': 'error'})

        try:
            ano = int(ano)
        except ValueError:
            mensagem = "Ano deve ser um número válido!"
            return render(request, 'adcFilmeAdmin.html', {'mensagem': mensagem, 'tipo_mensagem': 'error'})

        novo_filme = Filmes(
            titulo=titulo,
            diretor=diretor,
            ano=ano,
            genero=genero,
            tipo=tipo,
            sinopse=sinopse,
        )
        novo_filme.save()

        mensagem = "Filme cadastrado com sucesso!"
        return render(request, 'adcFilmeAdmin.html', {'mensagem': mensagem, 'tipo_mensagem': 'success'})

    return render(request, 'adcFilmeAdmin.html')

@login_required
def visuFilmeUser(request):
    filmes = Filmes.objects.all()
    favoritos = Favorito.objects.filter(usuario=request.user).values_list('filme_id', flat=True)

    return render(request, 'visuFilmeUser.html', {
        'filmes': filmes,
        'ids_filmes_favoritos': list(favoritos)
    })

@login_required
def avaliacaoFilmeUser(request, filme_id):
    filme = get_object_or_404(Filmes, id=filme_id)
    comentarios = Comentario.objects.filter(filme=filme).order_by('-id')

    if request.method == 'POST':
        comentario = request.POST.get('comentario')
        nota = request.POST.get('nota')
        Comentario.objects.create(
            usuario=request.user,
            filme=filme,
            texto=comentario,
            nota=nota
        )
        return render(request, 'avaliacaoFilmeUser.html', {
            'filme': filme,
            'comentarios': comentarios,
            'mensagem': 'Filme foi avaliado com sucesso!',
            'tipo_mensagem': 'success',
        })

    return render(request, 'avaliacaoFilmeUser.html', {
        'filme': filme,
        'comentarios': comentarios
    })

@login_required
def visuFilmeAdmin(request):
    filmes = Filmes.objects.all()

    return render(request, 'visuFilmeAdmin.html', {'filmes': filmes})

@login_required
def visuComentariosAdmin(request, filme_id):
    comentarios = Comentario.objects.filter(filme_id=filme_id)
    filme = get_object_or_404(Filmes, id=filme_id)

    return render(request, 'visuComentarios.html', {
        'filme': filme,
        'comentarios': comentarios
    })

@login_required
def deletarComentarioAdmin(request, comentario_id):
    comentario = get_object_or_404(Comentario, id=comentario_id)
    comentario.delete()
    return redirect(request.META.get('HTTP_REFERER', 'visuComentariosAdmin'))

@login_required
def favoritarFilme(request, filme_id):
    filme = get_object_or_404(Filmes, id=filme_id)
    favorito, criado = Favorito.objects.get_or_create(usuario=request.user, filme=filme)
    
    if not criado:
        favorito.delete()
    
    return redirect('visuFilmeUser')

@login_required
def verFavoritos(request):
    favoritos = Favorito.objects.filter(usuario=request.user).select_related('filme')
    filmes = [fav.filme for fav in favoritos]

    return render(request, 'verFavoritos.html', {
        'filmes': filmes
    })

@login_required
def sair(request):
    logout(request)
    return redirect('login')

@login_required
def verMaisFilmeAdmin(request, filme_id):
    filme = get_object_or_404(Filmes, id=filme_id)
    return render(request, 'verMaisFilmeAdmin.html', {'filme': filme})

@login_required
def verMaisFilmeUser(request, filme_id):
    filme = get_object_or_404(Filmes, id=filme_id)
    return render(request, 'verMaisFilmeUser.html', {'filme': filme})

@login_required
def deletarFilmeAdmin(request, filme_id):
    filme = get_object_or_404(Filmes, id=filme_id)
    filme.delete()
    return redirect(request.META.get('HTTP_REFERER', 'visuFilmeAdmin'))