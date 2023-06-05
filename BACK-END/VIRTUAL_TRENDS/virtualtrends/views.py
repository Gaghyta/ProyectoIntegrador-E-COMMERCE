from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import LoginSerializer, ProductSerializer, ColorProducSerializer, ImgProducSerializer
from rest_framework import status
from .models import Login, Usuario, Productos, ColoresProductos, ImagenesProducto, Colores, Talla, TallaDelProducto, ProductosEnCarrito


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
    
    def post (self, request):

        dni = request.data.get('id_usuario')
        try:
            carrito = Carrito.objects.get(dni=dni)
            id_car = carrito.id_car
        except Carrito.DoesNotExist:
            carrito = Carrito.objects.create(dni=dni)
            id_car = carrito.id_car

        producto_en_carrito = ProductosEnCarrito(
            id_prod=request.data.get('id_producto'),
            id_car=id_car,
            cantidad=request.data.get('cantidad'),
            talla=request.data.get('talla'),
            color=request.data.get('color'),
            espersonalizado=request.data.get('personalizado')
        )

        producto_en_carrito.save()

    def put (self, request):
        pass
    def delelte (self, request):
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
        serializer = ProductSerializer(products, many = True)
        return Response(serializer.data)
    
class ColorProducView(APIView):
    def get(self, request, id_prod):
        color = ColoresProductos.objects.filter(id_prod=id_prod)
        a = []
        for obj in color:
            col = obj.id_color.__str__()
            a.append(col)
            response_data = {'colores': a}
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
