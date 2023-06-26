from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.views import View
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import  IsAdminUser, AllowAny, IsAuthenticated
from .serializers import CategoriaSerializer, LoginSerializer, ProductSerializer, ImgProducSerializer, FavoriteSerializer, UsuarioSerializer
from rest_framework import status
from .models import Categoria, Login, Usuario, Productos, ColoresProductos, ImagenesProducto, Colores, Talla, TallaDelProducto, ProductosEnCarrito, TallesPersonalizados, Carrito, Favoritos, Newsletter 
from django.forms.models import model_to_dict
from rest_framework.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
# Create your views here.

class TallaDeProductoView(View):
    def get(self, request):
        id_producto = request.GET.get('id_producto')
        tallas_del_producto = TallaDelProducto.objects.filter(id_prod = id_producto)
        tallas = Talla.objects.filter(id_talle__in = tallas_del_producto.values('id_talle'))
        talles_disponibles = list(tallas.values_list('inicial_talle', flat=True))
        return JsonResponse(talles_disponibles, safe=False)


    def post(self, request):
        return Response({'message': 'Peticion erronea'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    def put(self, request):
        return Response({'message': 'Peticion erronea'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    def delete(self, request):
        return Response({'message': 'Peticion erronea'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
class CrearTallaPersonalizada(APIView):
    def get(self, request):
        return Response({'message': 'Peticion erronea'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    def put(self, request):
        return Response({'message': 'Peticion erronea'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    def post(self, request):
        talla = request.data
        dni_entrante = talla['dni']
        tallas_entrantes = talla['tallas'] 
        print("talla_pers llamada")

        try:
            talla_guardada = TallesPersonalizados.objects.get(dni=dni_entrante)

        except TallesPersonalizados.DoesNotExist:
            talla_guardada = TallesPersonalizados.objects.create(dni=Usuario.objects.get(dni=dni_entrante))

        talla_guardada.cuello = tallas_entrantes['cuello']
        talla_guardada.busto = tallas_entrantes['busto']
        talla_guardada.con_rodilla = tallas_entrantes['conRodilla']
        talla_guardada.larg_talle = tallas_entrantes['largTalle']
        talla_guardada.con_cintura = tallas_entrantes['conCintura']
        talla_guardada.con_cadera = tallas_entrantes['conCadera']
        talla_guardada.larg_manga = tallas_entrantes['largManga']
        talla_guardada.con_muneca = tallas_entrantes['conMuneca']
        talla_guardada.larg_pierna = tallas_entrantes['largPierna']
        talla_guardada.altura_rodilla = tallas_entrantes['alturaRodilla']

        talla_guardada.save()

    
        return Response({'message': 'Producto guardado'}, status=status.HTTP_201_CREATED)

    def delete(self, request):
        return Response({'message': 'Peticion erronea'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class DataUserView (APIView):
    def get(self, request, dni):
        logins = Usuario.objects.get(dni = dni)
        serializer = UsuarioSerializer(logins, many=False)
        return Response(serializer.data)

class UpdateUserView(APIView):
    def put(self, request):
        dni = request.data.get('dni')
        try:
            usuario = Usuario.objects.get(dni=dni)
            usuario.nombre = request.data.get('nombre')
            usuario.apellido = request.data.get('apellido')
            usuario.tel_cel = request.data.get('tel')
            usuario.dir_calle = request.data.get('dir_calle')
            usuario.dir_numero = request.data.get('dir_numero')
            usuario.cp = request.data.get('cp')
            usuario.ciudad = request.data.get('ciudad')
            usuario.provincia = request.data.get('provincia')
            usuario.ph = request.data.get('ph')
            usuario.save()
        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'message': 'Usuario se actualizó correctamente'})

class UsuariosView(View):
    def get(self, request):
        #Get all the users filtering by their id lvl (2 = user)
        users = Usuario.objects.filter(id_lvl_id = 2)
        #Transform the users to json
        users = list(users.values())
        #Return the json
        return JsonResponse(users, safe=False, json_dumps_params={'ensure_ascii': False})
    

class ProductoAlCarritoView (APIView):
    print("0")
    def get (self, request):
        return Response({'message': 'Peticion erronea'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def post (self, request):

        dni = request.data.get('id_usuario')
        try:
            carrito = Carrito.objects.get(dni=dni)

        except Carrito.DoesNotExist:
            carrito = Carrito.objects.create(dni=Usuario.objects.get(dni=dni))

        producto = request.data.get('id_producto')
        producto_seleccionado = Productos.objects.get(id_prod=producto)

        producto_en_carrito = ProductosEnCarrito(
            id_prod=producto_seleccionado,
            id_car=carrito,
            cantidad=1,
            talla=request.data.get('talla'),
            color=request.data.get('color'),
            espersonalizado=request.data.get('personalizado')
        )

        producto_en_carrito.save()

        return Response({'message': 'Producto guardado'}, status=status.HTTP_201_CREATED)

    def put (self, request):
        return Response({'message': 'Peticion erronea'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    def delete (self, request):
        return Response({'message': 'Peticion erronea'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

class  ConsultProductoCarrito(APIView):
    def get(self, request):
        dni_rec=request.GET.get('dni')
        carrito = Carrito.objects.filter(dni=Usuario.objects.get(dni=dni_rec), concretado=False).first()

        if carrito:
            products = []
            productos_en_carrito = ProductosEnCarrito.objects.filter(id_car=carrito)
            for list in productos_en_carrito:  
                products.append({
                    'id_prod': list.id_prod.id_prod,
                    'id_car': list.id_car.id_car,
                    'nombre': list.id_prod.nombre,
                    'precio': list.id_prod.precio,
                    'cantidad': list.cantidad,
                    'talla': list.talla,
                    'color': list.color,
                    'espersonalizado': list.espersonalizado
                })

            return Response(products)
        return Response({'error': 'Aun no tienes articulos en tu carrito'}, status=status.HTTP_404_NOT_FOUND)
    def put (self, request):
        return Response({'message': 'Peticion erronea'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    def post (self, request):
        return Response({'message': 'Peticion erronea'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    def delete (self, request):
        return Response({'message': 'Peticion erronea'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
class LoginListView(APIView):
    def get(self, request):
        logins = Login.objects.all()
        serializer = LoginSerializer(logins, many=True)
        return Response(serializer.data)

class LoginUpdateView(APIView):
    def put(self, request, email):
        try:
            login = Login.objects.get(email=email)
        except Login.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = LoginSerializer(login, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginValidView(APIView):
    def post(self, request):
        email = request.data.get('email')
        psw = request.data.get('psw')

        try:
            login = Login.objects.get(email=email, psw=psw)
        except Login.DoesNotExist:
            return Response({'msj':"El email y la contraseña son incorrectos"}, status=status.HTTP_404_NOT_FOUND)

        usuario = Usuario.objects.get(dni=login.dni_id)
        response_data = {
            'nombre': usuario.nombre,'apellido': usuario.apellido,'dni': usuario.dni, 'id_lvl': usuario.id_lvl.id_lvl, 'menssaje':'OK'
            }
        return Response(response_data)

class ProductListView(APIView):
    def post(self, request):
        products = Productos.objects.filter(eliminar=False)
        lib = []
        for prod in products:
            color = ColoresProductos.objects.filter(id_prod=prod.id_prod)
            picture = ImagenesProducto.objects.filter(id_prod=prod.id_prod)
            if (Favoritos.objects.filter(id_prod=prod.id_prod, dni=request.data.get('dni')).exists()):
                favorite = True
            else:
                favorite = False
            a = []
            b = []
            for obj in color:
                col = obj.id_color.__str__()
                a.append(col)
            for obj2 in picture:
                img = obj2.img
                b.append(img)
            
            lib.append ({
                'id':prod.id_prod, 
                'name': prod.nombre,
                'description':prod.desc,
                'price': prod.precio, 
                'icon': b[0], 
                'pictures': b, 
                'colors': a, 
                'type': prod.id_cat.__str__(),
                'amount': prod.stock,
                'favorite': favorite
                })
        response_data={'products': lib}
        return JsonResponse(response_data, json_dumps_params={'ensure_ascii': False})

class ProductView(APIView):
    def get(self, request, id_prod):
        try:
            product = Productos.objects.get(id_prod=id_prod)
            colors = ColoresProductos.objects.filter(id_prod=id_prod)
            pictures = ImagenesProducto.objects.filter(id_prod=id_prod)
            tallas_del_producto = TallaDelProducto.objects.filter(id_prod=id_prod)
            tallas = Talla.objects.filter(id_talle__in = tallas_del_producto.values('id_talle'))
            talles_disponibles = list(tallas.values_list('inicial_talle', flat=True))
            a = []
            b = []
            for obj in colors:
                col = obj.id_color.__str__()
                a.append(col)
            for obj2 in pictures:
                img = obj2.img
                b.append(img)
            
            lib = {
                'nombre': product.nombre,
                'descripcion':product.desc,
                'precio': product.precio, 
                'imagenes': b, 
                'colores': a, 
                'tallas': talles_disponibles,
                'categoria': product.id_cat.__str__(),
                'eliminar': product.eliminar
            }

        except Productos.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        return Response(lib)

class CategoListView(APIView):
    def get(self, request):
        categorias = Categoria.objects.all()
        serializer = CategoriaSerializer(categorias, many=True)
        categoriasList = []
        for categoria in serializer.data:
            categoriasList.append(categoria['nombre'])
        return Response(categoriasList)
    
class ImgProducView(APIView):
    def get(self, request, id_prod):
        img = ImagenesProducto.objects.filter(id_prod = id_prod)
        serializer = ImgProducSerializer(img, many = True)
        return Response(serializer.data)
    
class RegistroView(APIView):
    def post(self, request):
        dni = request.data.get('dni')
        nombre = request.data.get('nombre')
        apellido = request.data.get('apellido')
        email = request.data.get('email')
        psw = request.data.get('psw')
        tel_cel = request.data.get('tel_cel')
        dir_calle = request.data.get('dir_calle')
        dir_numero = request.data.get('dir_numero')
        cp = request.data.get('cp')
        ciudad = request.data.get('ciudad')
        provincia = request.data.get('provincia')
        ph = request.data.get('ph')

        try:
            usuario = Usuario.objects.create(
                dni=dni, nombre=nombre, apellido=apellido, tel_cel=tel_cel, dir_calle=dir_calle,
                dir_numero=dir_numero, cp=cp, ciudad=ciudad, provincia=provincia, ph=ph
            )
            login = Login.objects.create(email=email, psw=psw, dni=usuario)
        except IntegrityError:
            raise ValidationError({'error': 'El email o DNI ya se encuentran en uso.'})

        return Response({'mensaje': 'Usuario registrado exitosamente'})

class FavoritesView(APIView):
    def get(self, request, dni):
        favoritos = Favoritos.objects.select_related('id_prod').filter(dni=dni)
        serialized_data = []
        
        for favorito in favoritos:
            listcolor = []
            listimg = []
            colors = ColoresProductos.objects.select_related('id_color').filter(id_prod = favorito.id_prod.id_prod)
            imgs = ImagenesProducto.objects.filter(id_prod = favorito.id_prod.id_prod)
            for color in colors:
                listcolor.append(color.id_color.nombre)
            for img in imgs:
                listimg.append(img.img)
            serialized_data.append({
                'id': favorito.id_prod.id_prod,
                'name': favorito.id_prod.nombre,
                'description': favorito.id_prod.desc,
                'amount': favorito.id_prod.stock,
                'colors': listcolor,
                'img' : listimg,
                'icon': listimg[0],
                'price': str(favorito.id_prod.precio),
                'type': favorito.id_prod.id_cat.id_cat,
                'favorite': True,
            })
            
        return Response(serialized_data)

class FavoriteChangeView(APIView):
    def post(self, request):
        producto = Productos.objects.get(id_prod=request.data.get('id_prod'))
        usuario = Usuario.objects.get(dni=request.data.get('dni'))
        try:
            Favoritos.objects.get(id_prod = producto, dni = usuario).delete()
            return Response({'mensaje': 'Favorito eliminado exitosamente'})
        except:
            Favoritos.objects.create(id_prod = producto, dni = usuario)
            return Response({'mensaje': 'Favorito agregado exitosamente'})

class NewsletterView (View):
    def post (self, request):
        newsletter = Newsletter()
        newsletter.email = request.POST ["email"]
        newsletter.save()

class RetornarPagado(APIView): # Retornar custom json
    def post(self, request):
        # Reduce 1 stock for all the products in the list
        for product in request.data.get('data'):
            objProduct = Productos.objects.get(id_prod=product)
            objProduct.stock -= 1
            objProduct.save()
            try:
                productoEnCarrito = Carrito.objects.get(id_prod = product, concretado = False)
                productoEnCarrito.concretado = True
                productoEnCarrito.save()
            except:
                pass
        return Response({"transaccion": "aprobada"}, status=status.HTTP_200_OK)
    
class VerUsuarioView(View):
    def get(self, request):
        dniRecibido = request.GET.get('dni')
        usuario = get_object_or_404(Usuario, dni = dniRecibido)
        usuario_data = {
            'dni': usuario.dni,
            'nombre': usuario.nombre,
            'apellido': usuario.apellido,
            'tel_cel': usuario.tel_cel,
            'dir_calle': usuario.dir_calle,
            'dir_numero': usuario.dir_numero,
            'cp': usuario.cp,
            'ciudad': usuario.ciudad,
            'provincia': usuario.provincia,
            'ph': usuario.ph,
            'id_lvl': usuario.id_lvl.id_lvl
        }
        return JsonResponse(usuario_data, status=status.HTTP_200_OK, safe=False)
    

    def post(self, request):
        return Response({'message': 'Peticion erronea'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    def put(self, request):
        return Response({'message': 'Peticion erronea'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    def delete(self, request):
        return Response({'message': 'Peticion erronea'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

class AddProductView(APIView):
    def post(self, request):
        #Datos para models Productos
        nombre = request.data.get('nombre')
        desc = request.data.get('descripcion')
        stock = 100
        precio = request.data.get('precio')
        id_cat = Categoria.objects.get(nombre = request.data.get('categoria'))
        #Datos para model ImagenesProducto
        imgs = request.data.get('imagenes')
        #Datos para el model ColoresProductos
        colors = request.data.get('colores')
        #Datos para el model TallaDelProducto
        size = request.data.get('tallas')

        try: 
            addprod = Productos.objects.create(nombre=nombre, precio=precio, id_cat=id_cat, stock=stock, desc=desc, eliminar=False)
            for list in imgs:
                ImagenesProducto.objects.create(img=list, id_prod=addprod)
            for list in colors:
                colores = Colores.objects.get(nombre = list)
                ColoresProductos.objects.create(id_color = colores, id_prod=addprod)
            for list in size:
                tallas = Talla.objects.get(inicial_talle = list)
                TallaDelProducto.objects.create(id_talle=tallas, id_prod=addprod)
        except Exception as e:
            return Response({'error' : str(e)})
        
        return Response({'message' : 'Se agrego el producto correctamente.'})
    
class EliminarUsuarioView(APIView):
    def post (self,request):
        id_usuario = request.data.get('dni')
        try:
            usuario = Usuario.objects.get(dni=id_usuario)
           
        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        usuario.delete()
        return Response({'message': 'Usuario eliminado correctamente'})


class DeleteProductView(APIView):
    """
    Los productos no se pueden eliminar de la tabla directamente,
    ya que se perdería la persistencia de datos cuando se quiera hacer
    un historial de compra, por lo que se optó por dejar los productos como 
    'ocultos' por medio de un atributo. 
    """
    def put(self, request):
        id_prod = request.data.get('id_prod')
        try:
            product = Productos.objects.get(id_prod = id_prod, eliminar = False)
        
        except Productos.DoesNotExist:
            return Response({'error': 'El producto no existe o ya fue eliminado'}, status=status.HTTP_404_NOT_FOUND)
        
        product.eliminar = True
        product.save()
        return Response({'message': 'Producto eliminado correctamente'})

class UpdateProductView(APIView):
    def put(self, request):
        id_prod = request.data.get('id_prod')
        try:
            producto = Productos.objects.get(id_prod=id_prod)
        except Productos.DoesNotExist:
            return Response({'error': 'El producto no existe'}, status=status.HTTP_404_NOT_FOUND)
        
        # Datos para actualizar en el modelo Productos
        producto.nombre = request.data.get('nombre')
        producto.descripcion = request.data.get('descripcion')
        producto.precio = request.data.get('precio')
        producto.id_cat = Categoria.objects.get(nombre=request.data.get('categoria'))
        
        # Eliminar las imágenes existentes y crear nuevas imágenes
        nuevas_imagenes = request.data.get('imagenes')
        ImagenesProducto.objects.filter(id_prod = producto).delete()  # Eliminar todas las imágenes existentes
        
        for img in nuevas_imagenes:
            ImagenesProducto.objects.create(img=img, id_prod=producto)
        
        # Eliminar los colores existentes y crear nuevos colores
        nuevos_colores = request.data.get('colores')
        ColoresProductos.objects.filter(id_prod=producto).delete()  # Eliminar todos los colores existentes
        
        for color in nuevos_colores:
            color_obj = Colores.objects.get(nombre=color)
            ColoresProductos.objects.create(id_color=color_obj, id_prod=producto)
        
        # Eliminar las tallas existentes y crear nuevas tallas
        nuevas_tallas = request.data.get('tallas')
        TallaDelProducto.objects.filter(id_prod=producto).delete()  # Eliminar todas las tallas existentes
        
        for talla in nuevas_tallas:
            talla_obj = Talla.objects.get(inicial_talle=talla)
            TallaDelProducto.objects.create(id_talle=talla_obj, id_prod=producto)
        
        producto.save()
        return Response({'message': 'Producto actualizado correctamente'})
