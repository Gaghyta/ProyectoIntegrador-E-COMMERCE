from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import LoginSerializer, ProductSerializer, ColorProducSerializer, ImgProducSerializer
from rest_framework import status
from .models import Login, Usuario, Productos, ColoresProductos, ImagenesProducto, Colores, Talla, TallaDelProducto, ProductosEnCarrito, TallesPersonalizados, Carrito

from .models import Newsletter

# Create your views here.

class ProductosView(View):
    def get(self, request):
        datos = {
            'productos': [{
                'name': 'producto 1',
                'price': 1000
            },
            {
                'name': 'producto 2',
                'price': 2000
            },
            {
                'name': 'producto 3',
                'price': 3000
            }]
        }
        return JsonResponse(datos)
    def post(self, request):
        pass
    def put(self, request):
        pass
    def delete(self, request):
        pass

class TallaDeProductoView(View):
    def get(self, request):
        id_producto = request.GET.get('id_producto')
        tallas_del_producto = TallaDelProducto.objects.filter(id_prod = id_producto)
        tallas = Talla.objects.filter(id_talle__in = tallas_del_producto.values('id_talle'))
        talles_disponibles = list(tallas.values_list('inicial_talle', flat=True))
        return JsonResponse(talles_disponibles, safe=False)


    def post(self, request):
        pass
    def put(self, request):
        pass
    def delete(self, request):
        pass
    
class CrearTallaPersonalizada(View):
    def get(self, request):
        pass
    def post(self, request):
        pass
    def put(self, request):
        
        talla = request.data
        dni_entrante = talla['dni']

        talla_personalizada = get_object_or_404(TallesPersonalizados, dni = dni_entrante)

        if talla_personalizada:
            talla_personalizada.cuello = ['cuello']
            talla_personalizada.busto = ['busto']
            talla_personalizada.con_rodilla = ['conRodilla']
            talla_personalizada.larg_talle = ['largTalle']
            talla_personalizada.con_cintura = ['conCintura']
            talla_personalizada.con_cadera = ['conCadera']
            talla_personalizada.larg_manga = ['largManga']
            talla_personalizada.con_muneca = ['conMuneca']
            talla_personalizada.larg_pierna = ['largPierna']
            talla_personalizada.altura_rodilla = ['alturaRodilla']
        else:
            talla_personalizada = TallesPersonalizados(
                cuello = talla['cuello'],
                busto = talla['busto'],
                con_rodilla = talla['conRodilla'],
                larg_talle = talla['largTalle'],
                con_cintura = talla['conCintura'],
                con_cadera = talla['conCadera'],
                larg_manga = talla['largManga'],
                con_muneca = talla['conMuneca'],
                larg_pierna = talla['largPierna'],
                altura_rodilla = talla['alturaRodilla'],
                dni = talla['dni']
            )
        
        talla_personalizada.save()

        return Response({'message': 'Talle personalizado creado/actualizado con éxito'}, status=status.HTTP_201_CREATED)


    def delete(self, request):
        pass


class UsuarioView (View):
    def get (self, request, pk):
        user = get_object_or_404 (Usuario, dni= pk)
        context = {"user": user}
        return render (request, "editar-cuenta.component.html", context)
    
    def post (self, request, pk=None):
        user = get_object_or_404 (Usuario, dni=pk)
        user.nombre = request.POST["nombre"]
        user.apellido = request.POST ["apellido"]
        user.tel_cel = request.POST ["tel"]
        user.dir_calle = request.POST ["dir_calle"]
        user.dir_numero = request.POST ["dir_numero"]
        user.cp = request.POST ["cp"]
        user.ciudad = request.POST ["ciudad"]
        user.provincia = request.POST ["provinica"]
        user.ph = request.POST ["ph"]
        user.save () 
        return redirect ("/")
    
class ProductoAlCarritoView (View):
    def get (self, request):
        pass
    
    def put (self, request):

        dni = request.data.get('id_usuario')
        try:
            carrito = carrito.objects.get(dni=dni)
            if(carrito.concretado==True):
                raise(Exception)
            id_car = Carrito.id_car
        except Carrito.DoesNotExist:
            carrito = Carrito.objects.create(dni=dni)
            id_car = Carrito.id_car

        producto_en_carrito = ProductosEnCarrito(
            id_prod=request.data.get('id_producto'),
            id_car=id_car,
            cantidad=request.data.get('cantidad'),
            talla=request.data.get('talla'),
            color=request.data.get('color'),
            espersonalizado=request.data.get('personalizado')
        )

        producto_en_carrito.save()

    def post (self, request):
        pass
    def delete (self, request):
        pass
    
class ConsultProductoCarrito(View):
    def get(self, request):
        dnitemp = request.GET.get('dni')
        carrito = Carrito.objects.filter(dni=dnitemp, concretado=False).first()

        if carrito:
            productos_en_carrito = ProductosEnCarrito.objects.filter(id_car=carrito.id_car)
            return JsonResponse(productos_en_carrito)
        return JsonResponse({'error': 'Aun no tienes articulos en tu carrito'}, status=status.HTTP_404_NOT_FOUND)
    def post (self, request):
        pass
    def put (self, request):
        pass
    def delete (self, request):
        pass
    

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

class LoginQueryView(APIView):
    def post(self, request):
        email = request.data.get('email')
        psw = request.data.get('psw')

        try:
            login = Login.objects.get(email=email, psw=psw)
        except Login.DoesNotExist:
            return Response("El email y la contraseña son incorrectos", status=status.HTTP_404_NOT_FOUND)

        usuario = Usuario.objects.get(dni=login.dni_id)
        response_data = {
            'nombre': usuario.nombre,'apellido': usuario.apellido,'dni': usuario.dni
            }
        return Response(response_data)

class ProductListView(APIView):
    def get(self, request):
        products = Productos.objects.all()
        lib = []
        for prod in products:
            color = ColoresProductos.objects.filter(id_prod=prod.id_prod)
            picture = ImagenesProducto.objects.filter(id_prod=prod.id_prod)
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
                })
        response_data={'products': lib}
        return JsonResponse(response_data)

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

        usuario = Usuario(
            dni=dni, nombre=nombre, apellido=apellido, tel_cel=tel_cel, dir_calle=dir_calle,
            dir_numero=dir_numero, cp=cp, ciudad=ciudad, provincia=provincia, ph=ph
            )
        usuario.save()
        login = Login(email=email, psw=psw, dni=usuario)
        login.save()

        return Response({'mensaje': 'Usuario registrado exitosamente'})


class NewsletterView (View):
    def post (self, request):
        newsletter = Newsletter()
        newsletter.email = request.POST ["email"]
        newsletter.save()
        