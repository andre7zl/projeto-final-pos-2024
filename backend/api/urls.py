from rest_framework.routers import DefaultRouter
from .views import (
    UsuarioViewSet, PostagemViewSet, ComentarioViewSet,
    TarefaViewSet, AlbumViewSet, FotoViewSet
)

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'postagens', PostagemViewSet)
router.register(r'comentarios', ComentarioViewSet)
router.register(r'tarefas', TarefaViewSet)
router.register(r'albuns', AlbumViewSet)
router.register(r'fotos', FotoViewSet)

urlpatterns = router.urls
