# Generated by Django 5.1.4 on 2024-12-14 21:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Postagem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=200)),
                ('corpo', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('nome_usuario', models.CharField(max_length=50)),
                ('telefone', models.CharField(max_length=15)),
                ('website', models.URLField()),
            ],
        ),
        migrations.RemoveField(
            model_name='photo',
            name='album',
        ),
        migrations.RemoveField(
            model_name='post',
            name='user',
        ),
        migrations.RemoveField(
            model_name='todo',
            name='user',
        ),
        migrations.RemoveField(
            model_name='album',
            name='user',
        ),
        migrations.RemoveField(
            model_name='album',
            name='title',
        ),
        migrations.AddField(
            model_name='album',
            name='titulo',
            field=models.CharField(default='1', max_length=200),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Foto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=200)),
                ('url', models.URLField()),
                ('url_miniatura', models.URLField()),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fotos', to='api.album')),
            ],
        ),
        migrations.CreateModel(
            name='Comentario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('corpo', models.TextField()),
                ('postagem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comentarios', to='api.postagem')),
            ],
        ),
        migrations.CreateModel(
            name='Tarefa',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=200)),
                ('concluida', models.BooleanField(default=False)),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tarefas', to='api.usuario')),
            ],
        ),
        migrations.AddField(
            model_name='postagem',
            name='usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='postagens', to='api.usuario'),
        ),
        migrations.AddField(
            model_name='album',
            name='usuario',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='albuns', to='api.usuario'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Comment',
        ),
        migrations.DeleteModel(
            name='Photo',
        ),
        migrations.DeleteModel(
            name='Post',
        ),
        migrations.DeleteModel(
            name='ToDo',
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]