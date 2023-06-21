from django.urls import path
from .views import CategoListView, UpdateProductView, DeleteProductView, EliminarUsuarioView, FavoriteChangeView, FavoritesView, RetornarPagado, TallaDeProductoView, LoginListView, LoginUpdateView, LoginValidView, ProductListView, ProductView, ImgProducView, RegistroView, ProductoAlCarritoView, NewsletterView, CrearTallaPersonalizada, VerUsuarioView, ConsultProductoCarrito, UsuariosView, AddProductView, DataUserView, UpdateUserView

urlpatterns = [
    path('talla-de-producto/', TallaDeProductoView.as_view(), name='talle-de-producto'),
    path('login/', LoginListView.as_view(), name='login-list'),
    path('login/<str:email>/', LoginUpdateView.as_view(), name='login-update'),
    path('valid/', LoginValidView.as_view(), name='login-valid'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:id_prod>/', ProductView.as_view(), name='product'),
    path('product/imgprod/<int:id_prod>/', ImgProducView.as_view(), name='img-prod'),
    path('favorites/<int:dni>/', FavoritesView.as_view(), name='favorites'),
    path('favorites/change/', FavoriteChangeView.as_view(), name='favorites-change'),
    path('logup/', RegistroView.as_view(), name='usuarios'),
    path('producto-al-carrito/', ProductoAlCarritoView.as_view (), name='producto-al-carrito'),
    path('newsletter/', NewsletterView.as_view(), name='newsletter'),
    path('crear-talla-personalizada/', CrearTallaPersonalizada.as_view(), name='crear-talla-personalizada'),
    path('consultar-carrito/', ConsultProductoCarrito.as_view(), name='consultar-carrito'),
    path('product/categorias/', CategoListView.as_view(), name='categorias'),
    path('ver-usuario/', VerUsuarioView.as_view(), name='ver-usuario'),
    path('products/add/', AddProductView.as_view(), name="add-product"),
    path('products/delete/', DeleteProductView.as_view(), name='delete-product'),
    path('products/update/', UpdateProductView.as_view(), name="update-product" ),
    path('users/', UsuariosView.as_view(), name='users'),
    path('pago/status/', RetornarPagado.as_view(), name='pago-status'),
    path('usuarios/eliminar/', EliminarUsuarioView.as_view(), name='eliminar_usuario'),
    path('usuarios/data/<int:dni>/', DataUserView.as_view(), name='data-user'), 
    path('usuarios/update/', UpdateUserView.as_view(), name='update-user')
]