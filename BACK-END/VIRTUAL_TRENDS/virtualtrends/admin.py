from django.contrib import admin

from .models import Carrito
from .models import Categoria
from .models import ColoresProductos
from .models import Compras
from .models import Contacto
from .models import EnvioDeCompras
from .models import Pago
from .models import Productos
from .models import TallesPersonalizados
from .models import ImagenesProducto
from .models import TallaDelProducto
from .models import Talla
from .models import Envio
from .models import Usuario
from .models import Niveluser
from .models import Favoritos
from .models import Login
from .models import Newsletter
from .models import ProductosEnCarrito
from .models import Colores

class ColoresAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'exa')

class CarritoAdmin(admin.ModelAdmin):
    list_display = ('concretado', 'dni')

class CategoriaAdmin(admin.ModelAdmin):
    list_display = ['nombre']

class ColoresProductosAdmin(admin.ModelAdmin):
    list_display = ('id_color', 'id_prod')

class ComprasAdmin(admin.ModelAdmin):
    list_display = ('id_car', 'id_pago', 'fecha', 'hora', 'estado')

class ContactoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tel', 'email', 'msj')

class EnvioDeComprasAdmin(admin.ModelAdmin):
    list_display = ('id_env', 'id_comp', 'destino_calle', 'destino_numero')

class PagoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'desc')

class ProductosAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'desc', 'stock', 'precio', 'talle_personalizado', 'eliminar', 'id_cat')

class TallesPersonalizadosAdmin(admin.ModelAdmin):
    list_display = ('cuello', 'busto', 'con_rodilla', 'larg_talle', 'con_cintura', 'con_cadera', 'larg_manga', 'con_muneca', 'larg_pierna', 'altura_rodilla', 'dni')

class ImagenesProductoAdmin(admin.ModelAdmin):
    list_display = ('img', 'id_prod')

class TallaDelProductoAdmin(admin.ModelAdmin):
    list_display = ('id_prod', 'id_talle')

class TallaAdmin(admin.ModelAdmin):
    list_display = ('inicial_talle', 'medida', 'm_h')

class EnvioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'desc')

class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('dni', 'nombre', 'apellido', 'tel_cel', 'dir_calle', 'dir_numero', 'cp', 'ciudad', 'provincia', 'ph', 'id_lvl')

class NiveluserAdmin(admin.ModelAdmin):
    list_display = ['nivel']

class FavoritosAdmin(admin.ModelAdmin):
    list_display = ('id_prod', 'dni')

class LoginAdmin(admin.ModelAdmin):
    list_display = ('email', 'psw', 'dni')

class NewsletterAdmin(admin.ModelAdmin):
    list_display = ['email']

class ProductosEnCarritoAdmin(admin.ModelAdmin):
    list_display = ('id_prod', 'id_car', 'cantidad', 'talla', 'espersonalizado')
        

admin.site.register(Carrito,CarritoAdmin)
admin.site.register(Categoria,CategoriaAdmin)
admin.site.register(ColoresProductos,ColoresProductosAdmin)
admin.site.register(Compras,ComprasAdmin)
admin.site.register(Contacto,ContactoAdmin)
admin.site.register(Pago,PagoAdmin)
admin.site.register(Productos,ProductosAdmin)
admin.site.register(TallesPersonalizados,TallesPersonalizadosAdmin)
admin.site.register(ImagenesProducto,ImagenesProductoAdmin)
admin.site.register(TallaDelProducto,TallaDelProductoAdmin)
admin.site.register(Talla,TallaAdmin)
admin.site.register(Envio,EnvioAdmin)
admin.site.register(EnvioDeCompras,EnvioDeComprasAdmin)
admin.site.register(Usuario,UsuarioAdmin)
admin.site.register(Niveluser,NiveluserAdmin)
admin.site.register(Favoritos,FavoritosAdmin)
admin.site.register(Login,LoginAdmin)
admin.site.register(Newsletter,NewsletterAdmin)
admin.site.register(ProductosEnCarrito,ProductosEnCarritoAdmin)
admin.site.register(Colores, ColoresAdmin)