from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField()
    nome_usuario = models.CharField(max_length=50)
    telefone = models.CharField(max_length=15)
    website = models.URLField()

class Postagem(models.Model):
    usuario = models.ForeignKey(Usuario, related_name="postagens", on_delete=models.CASCADE)
    titulo = models.CharField(max_length=200)
    corpo = models.TextField()

class Comentario(models.Model):
    postagem = models.ForeignKey(Postagem, related_name="comentarios", on_delete=models.CASCADE)
    nome = models.CharField(max_length=100)
    email = models.EmailField()
    corpo = models.TextField()

class Tarefa(models.Model):
    usuario = models.ForeignKey(Usuario, related_name="tarefas", on_delete=models.CASCADE)
    titulo = models.CharField(max_length=200)
    concluida = models.BooleanField(default=False)

class Album(models.Model):
    usuario = models.ForeignKey(Usuario, related_name="albuns", on_delete=models.CASCADE)
    titulo = models.CharField(max_length=200)

class Foto(models.Model):
    album = models.ForeignKey(Album, related_name="fotos", on_delete=models.CASCADE)
    titulo = models.CharField(max_length=200)
    url = models.URLField()
    url_miniatura = models.URLField()
