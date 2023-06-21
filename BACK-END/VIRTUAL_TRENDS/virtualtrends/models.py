from django.db import models
#from django.contrib.auth.models import AbstractUser


# Tabla para agregar los niveles de usuario/rol que cumplen.
class Niveluser(models.Model):
    id_lvl= models.AutoField(primary_key=True)
    nivel= models.CharField(max_length=20, blank=False)
    class Meta:
        db_table = 'nivel_u'
        verbose_name = 'Nivel de usuario'
        verbose_name_plural = "Niveles de usuarios"
    def __unicode__(self):
        return self.nivel
    def __str__(self):
        return self.nivel

# Tabla para agregar los usuarios que prtenecen al sistema.

class Usuario(models.Model):

    dni = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=20, blank=False)
    apellido = models.CharField(max_length=20, blank=False)
    tel_cel = models.IntegerField(blank=False)
    dir_calle = models.CharField(max_length=40, blank=False)
    dir_numero = models.IntegerField(blank=False)
    cp = models.IntegerField(blank=False)
    ciudad = models.CharField(max_length=20, blank=False)
    provincia = models.CharField(max_length=20, blank=False)
    ph = models.CharField(max_length=30, blank=False)
    id_lvl = models.ForeignKey(Niveluser, to_field='id_lvl', on_delete=models.PROTECT, default=1)

    class Meta:
        db_table = 'usuario'
        verbose_name = 'Usuarios del sistema'
        verbose_name_plural = 'Usuarios'
    
    def __unicode__(self):
        return self.nombre +" "+self.apellido
    def __str__(self):
        nyp = self.nombre +" "+self.apellido
        return nyp

# Talles personalizados de cada usuario.

class TallesPersonalizados(models.Model):
    id_per = models.AutoField(primary_key=True)
    cuello = models.DecimalField(decimal_places=2, max_digits=10, blank=False)
    busto = models.DecimalField(decimal_places=2, max_digits=10, blank=False)
    con_rodilla = models.DecimalField(decimal_places=2, max_digits=10, blank=False)
    larg_talle = models.DecimalField(decimal_places=2, max_digits=10, blank=False)
    con_cintura = models.DecimalField(decimal_places=2, max_digits=10, blank=False)
    con_cadera = models.DecimalField(decimal_places=2, max_digits=10, blank=False)
    larg_manga = models.DecimalField(decimal_places=2, max_digits=10, blank=False)
    con_muneca = models.DecimalField(decimal_places=2, max_digits=10, blank=False)
    larg_pierna = models.DecimalField(decimal_places=2, max_digits=10, blank=False)
    altura_rodilla = models.DecimalField(decimal_places=2, max_digits=10, blank=False)
    dni = models.ForeignKey(Usuario, to_field='dni', on_delete=models.CASCADE)
    class Meta:
        db_table = 'talle_per'
        verbose_name = 'Talles Perzonalizados del Usuario'
        verbose_name_plural = 'Talles Perzonalizados'
    def __unicode__(self):
        return str(self.dni)
    def __str__(self):
        return str(self.dni)

# Tabla para agregrar los metodos de pago. 

class Pago(models.Model):
    id_pago = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=20, blank=False)
    desc = models.CharField(max_length=45, blank=False)

    class Meta:
        db_table = 'pago'
        verbose_name = 'Metodos de pago'
        verbose_name_plural = 'Pagos'
    def __unicode__(self):
        return self.nombre
    def __str__(self):
        return self.nombre

# Tabla para otorgar los diferentes tipos de talla de los prosuctos. 

class Talla(models.Model):
    id_talle = models.AutoField(primary_key=True)
    inicial_talle = models.CharField(max_length=10, blank=False)
    medida = models.DecimalField(decimal_places=2, max_digits=10, blank=False)
    m_h = models.BooleanField('True')
    class Meta:
        db_table = 'talla'
        verbose_name = 'Tallas de los productos'
        verbose_name_plural = 'Tallas'
    
    def __unicode__(self):
        return self.inicial_talle
    def __src__(self):
        return self.inicial_talle

# Tabla para las categoria de los productos.

class Categoria(models.Model):
    id_cat = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=20, blank=False)
    class Meta:
        db_table = 'categoria'
        verbose_name = 'Categorias de los productos'
        verbose_name_plural = 'Categorias'
    def __unicode__(self):
        return self.nombre
    def __str__(self):
        return self.nombre

# Persistencia de los mensajes que envian los usuarios o visitantes. 

class Contacto(models.Model):
    id_con = models.AutoField(primary_key=True)
    msj = models.TextField(max_length=1000, blank=False)
    email = models.CharField(max_length=50, blank=False)
    tel = models.IntegerField(blank=False)
    nombre = models.CharField(max_length=20, blank=False)
    class Meta:
        db_table = 'contacto'
        verbose_name = 'Mensajes de los usuarios para contactar'
        verbose_name_plural = 'Contactos'
    def __unicode__(self):
        return self.nombre
    def __str__(self):
        return self.nombre

# Diferentes formas por los que se envian las compras concretadas.

class Envio(models.Model):
    id_env = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=20, blank=False)
    desc = models.TextField(max_length=100, blank=False)
    class Meta:
        db_table = 'envio'
        verbose_name = 'Diferentes formas de envios'
        verbose_name_plural = 'Envios'
    def __unicode__(self):
        return self.nombre
    def __str__(self):
        return self.nombre

# Tabla de los productos. 

class Productos(models.Model):
    id_prod = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=20, blank=False)
    desc = models.TextField(max_length=200, blank=False)
    stock = models.IntegerField(blank=False)
    precio = models.DecimalField(decimal_places=2, max_digits=10, blank=False)
    talle_personalizado = models.BooleanField(default=True)
    eliminar = models.BooleanField(default=False)
    id_cat = models.ForeignKey(Categoria, to_field='id_cat', on_delete=models.PROTECT)
    class Meta:
        db_table = 'producto'
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
    def __unicode__(self):
        return self.nombre
    def __str__(self):
        return self.nombre

# Tabla de la ubicacion de las imagenes de cada producto. 

class ImagenesProducto(models.Model):
    img = models.CharField(max_length=150)
    id_prod = models.ForeignKey(Productos, to_field='id_prod', on_delete=models.CASCADE)
    class Meta:
        db_table = 'produc_img'
        verbose_name = 'Imagenes de los Productos'
        verbose_name_plural = "Imagenes"
    def __unicode__(self):
        return self.img
    def __str__(self):
        return str(self.id_prod)

# Colores disponibles.
class Colores(models.Model):
    id_color = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=20, blank=False)
    exa = models.CharField(max_length=6, blank=False)
    class Meta:
        db_table = 'color'
        verbose_name = 'Colores disponibles'
        verbose_name_plural = "Colores"
    def __unicode__(self):
        return self.nombre
    def __str__(self):
        return self.nombre
        

# Tabla de colores de cada producto. 

class ColoresProductos(models.Model):
    id_color = models.ForeignKey(Colores, to_field='id_color', on_delete=models.CASCADE)
    id_prod = models.ForeignKey(Productos, to_field='id_prod', on_delete=models.CASCADE)
    class Meta:
        db_table = 'produc_color'
        verbose_name = 'Colores de los Productos'
        verbose_name_plural = "Colores de Producto"
    def __unicode__(self):
        return self.id_color
    def __str__(self):
        return "Color "+str(self.id_color)+" en "+str(self.id_prod)
# Tabla concatenada entre productos y tallas, relación muchos a muchos. 

class TallaDelProducto(models.Model):
    id_prod = models.ForeignKey(Productos, to_field='id_prod', on_delete=models.CASCADE)
    id_talle = models.ForeignKey(Talla, to_field='id_talle', on_delete=models.PROTECT)
    class Meta:
        db_table = 'prod_talla'
        verbose_name = 'Tallas de cada Producto'
        verbose_name_plural = "Tallas de cada Producto"
    def __unicode__(self):
        return (self.id_talle, self.id_prod)
    def __str__(self):
        return "ID de talle " + str(self.id_talle) + " e ID de producto " + str(self.id_prod) 
    
# Tabla de los productos favoritos de cada usuario. 

class Favoritos(models.Model):
    id_prod = models.ForeignKey(Productos, to_field='id_prod', on_delete=models.CASCADE)
    dni = models.ForeignKey(Usuario, to_field='dni', on_delete=models.CASCADE)
    class Meta:
        db_table = 'favorito'
        verbose_name = 'Productos favoritos de cada usuario'
        verbose_name_plural = "Favoritos"
    def __unicode__(self):
        return str(self.dni)
    def __str__(self):
        return str(self.dni)

# Carrito de compras

class Carrito(models.Model):
    id_car = models.AutoField(primary_key=True)
    concretado = models.BooleanField(default=False)
    dni = models.ForeignKey(Usuario, to_field='dni', on_delete=models.CASCADE)
    class Meta:
        db_table = 'carrito'
        verbose_name = 'Carrito de compras'
        verbose_name_plural = "Carrito"
    def __unicode__(self):
        return str(self.id_car)
    def __str__(self):
        return str(self.id_car)

# Tablas de las compras concretadas. 

class Compras(models.Model):
    id_comp = models.AutoField(primary_key=True)
    estado = models.CharField(max_length=15, blank=False)
    hora = models.TimeField()
    fecha = models.DateField()
    id_car = models.ForeignKey(Carrito, to_field='id_car', on_delete=models.PROTECT)
    id_pago = models.ForeignKey(Pago, to_field='id_pago', on_delete=models.PROTECT)
    class Meta:
        db_table = 'compra'
        verbose_name = 'Compras concretadas'
        verbose_name_plural = "Compras"
    def __unicode__(self):
        return self.id_comp
    def __str__(self):
        return str(self.id_comp)

# Tipo de envio y destino del mismo.

class EnvioDeCompras(models.Model):
    cod_env = models.AutoField(primary_key=True)
    id_env = models.ForeignKey(Envio, to_field='id_env', on_delete=models.PROTECT)
    id_comp = models.ForeignKey(Compras, to_field='id_comp', on_delete=models.PROTECT)
    destino_calle = models.CharField(max_length=30, blank=False)
    destino_numero = models.IntegerField(blank=False)
    class Meta:
        db_table = 'envio_compra'
        verbose_name = 'En de las compras concretadas'
        verbose_name_plural = "Envio de Compras"
    def __unicode__(self):
        return self.cod_env
    def __str__(self):
        return "La compra "+ str(self.id_comp) +" se envía a " + str(self.destino_calle) + " " + str(self.destino_numero)

# Usuario y contraseña de los usuarios. 

class Login(models.Model):
    email = models.EmailField(max_length=50, primary_key=True)
    psw = models.CharField(max_length=30, blank=False)
    dni = models.ForeignKey(Usuario, to_field='dni', on_delete=models.CASCADE)
    class Meta:
        db_table = 'login'
        verbose_name = 'Usuario y contraseña para el login'
        verbose_name_plural = "Logeos"
    def __unicode__(self):
        return self.email
    def __str__(self):
        return self.email

# Productos en el carrito. 

class ProductosEnCarrito(models.Model):
    id_prod = models.ForeignKey(Productos, to_field='id_prod', on_delete=models.CASCADE)
    id_car = models.ForeignKey(Carrito, to_field='id_car', on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1, blank=False)
    talla = models.CharField(max_length=2, blank=False)
    color = models.CharField(default= "Sin color", max_length=30, blank=False)
    espersonalizado = models.BooleanField(default=False)
    class Meta:
        db_table = 'prod_carrito'
        verbose_name = 'Lista de los productos en los carritos'
        verbose_name_plural = "Productos en un Carrito"
    def __unicode__(self):
        return (self.id_car, self.id_prod)
    def __str__(self):
        return "El carrito "+str(self.id_car)+" tiene "+str(self.cantidad)+" del producto "+str(self.id_prod)

# LISTA DE DISTRIBUCIÓN NEWSLETTER 
class Newsletter(models.Model):
    email = models.CharField(max_length=50, primary_key=True)
    class Meta:
        db_table= 'newsletter'
        verbose_name = 'Lista de emails para distribución  de Nesletter Virtual Trends'
        verbose_name_plural = 'Newsletters'
    def _unicode_(self):
        return self.email
    def _str_(self):
        return self.email
    
""" class CustomUser(AbstractUser):
    email = models.EmailField(
        max_length=150, unique=True
    )
USERNAME_FIELD='email'
REQUIRED_FIELDS = ['username','password'] """


