# Guía de Pruebas - Sincronización Automática de Miembros

## 🧪 Plan de Pruebas Completo

### 1. Configuración del Entorno de Pruebas

#### 1.1 Servidor de Pruebas de Discord
```bash
# Crear un servidor de prueba en Discord
# - Nombre: "Realm of Darkness - Testing"
# - Invitar al bot de desarrollo
# - Agregar algunos usuarios de prueba
```

#### 1.2 Configuración del Bot de Desarrollo
```bash
# En discord_bots/
npm install
# Configurar variables de entorno para desarrollo
cp .env.example .env
# Editar .env con las credenciales de desarrollo
```

#### 1.3 Base de Datos de Pruebas
```bash
# En backend/
python manage.py migrate
python manage.py createsuperuser
```

### 2. Pruebas de Funcionalidad

#### 2.1 Prueba: Bot se Une a Servidor Existente

**Objetivo**: Verificar que cuando el bot se une a un servidor, sincroniza automáticamente todos los miembros.

**Pasos**:
1. Crear un servidor de Discord con 5-10 miembros
2. NO invitar el bot inicialmente
3. Registrar algunos usuarios en la base de datos (usando OAuth)
4. Invitar el bot al servidor
5. Verificar en los logs del bot:
   ```
   Sincronizando miembros existentes para el servidor: [Nombre] ([ID])
   Sincronización completada para X miembros en [Nombre]
   ```
6. Verificar en la base de datos:
   ```sql
   SELECT COUNT(*) FROM chronicle_member WHERE chronicle_id = [GUILD_ID];
   ```
7. Verificar en el frontend que los usuarios ven el servidor

**Resultado Esperado**: Todos los miembros del servidor aparecen en la base de datos y el frontend.

#### 2.2 Prueba: Nuevo Miembro se Une al Servidor

**Objetivo**: Verificar que cuando un nuevo miembro se une, se sincroniza automáticamente.

**Pasos**:
1. Tener el bot ya en un servidor
2. Invitar un nuevo usuario al servidor
3. Verificar en los logs:
   ```
   Nuevo miembro se unió: [Usuario]#[Tag] en [Servidor]
   ```
4. Verificar en la base de datos que se creó la relación de miembro
5. Verificar en el frontend que el usuario ve el servidor

**Resultado Esperado**: El nuevo miembro aparece automáticamente en la base de datos.

#### 2.3 Prueba: Autenticación OAuth Mejorada

**Objetivo**: Verificar que durante el login, se sincronizan todos los servidores del usuario.

**Pasos**:
1. Tener un usuario que no ha usado el bot antes
2. Tener el bot en varios servidores donde el usuario está presente
3. Hacer login con OAuth
4. Verificar en los logs del backend:
   ```
   Usuario [username] sincronizado con servidor [nombre]
   Sincronización completada: X servidores sincronizados para [username]
   ```
5. Verificar en la base de datos:
   ```sql
   SELECT * FROM chronicle_member WHERE user_id = [USER_ID];
   ```
6. Verificar en el frontend que el usuario ve todos sus servidores

**Resultado Esperado**: El usuario ve todos los servidores donde el bot está presente.

#### 2.4 Prueba: Comando de Sincronización Manual

**Objetivo**: Verificar que el comando `/syncmembers` funciona correctamente.

**Pasos**:
1. Tener el bot en un servidor con varios miembros
2. Ejecutar `/syncmembers` como administrador
3. Verificar que aparece el progreso:
   ```
   🔄 Sincronizando X miembros...
   Progreso: Y/X
   ✅ Sincronizados: Z
   ❌ Errores: W
   ```
4. Verificar el mensaje final con estadísticas
5. Verificar en la base de datos que todos los miembros están sincronizados

**Resultado Esperado**: Comando ejecuta correctamente y muestra progreso detallado.

### 3. Pruebas de Casos Edge

#### 3.1 Prueba: Servidor sin Bot
**Objetivo**: Verificar que no se crean relaciones para servidores donde el bot no está.

**Pasos**:
1. Usuario está en servidor A (con bot) y servidor B (sin bot)
2. Hacer login OAuth
3. Verificar que solo se crea relación para servidor A

#### 3.2 Prueba: Usuario con Permisos de Admin
**Objetivo**: Verificar que se detectan correctamente los permisos de administrador.

**Pasos**:
1. Usuario con permisos de admin en un servidor
2. Hacer login OAuth o sincronizar
3. Verificar que `admin = True` en la base de datos

#### 3.3 Prueba: Rate Limits
**Objetivo**: Verificar que las pausas evitan rate limits.

**Pasos**:
1. Servidor con muchos miembros (50+)
2. Ejecutar sincronización
3. Verificar que no hay errores de rate limit en los logs

#### 3.4 Prueba: Errores de API
**Objetivo**: Verificar que los errores individuales no interrumpen el proceso.

**Pasos**:
1. Simular error en un miembro específico
2. Verificar que la sincronización continúa para otros miembros
3. Verificar que se registran los errores en los logs

### 4. Pruebas de Rendimiento

#### 4.1 Prueba: Servidor Grande
**Objetivo**: Verificar rendimiento con muchos miembros.

**Pasos**:
1. Servidor con 100+ miembros
2. Ejecutar sincronización automática
3. Medir tiempo de ejecución
4. Verificar que no hay timeouts

#### 4.2 Prueba: Múltiples Servidores
**Objetivo**: Verificar rendimiento con múltiples servidores.

**Pasos**:
1. Bot en 5+ servidores simultáneamente
2. Ejecutar sincronizaciones en paralelo
3. Verificar que no hay conflictos

### 5. Scripts de Prueba Automatizados

#### 5.1 Script de Verificación de Base de Datos
```python
# backend/test_member_sync.py
import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rod.settings')
django.setup()

from chronicle.models import Chronicle, Member
from discordauth.models import User

def verify_member_sync(guild_id, expected_member_count):
    """Verifica que la sincronización de miembros fue exitosa"""
    try:
        chronicle = Chronicle.objects.get(id=guild_id)
        member_count = Member.objects.filter(chronicle=chronicle).count()
        print(f"Servidor: {chronicle.name}")
        print(f"Miembros esperados: {expected_member_count}")
        print(f"Miembros en BD: {member_count}")
        print(f"✅ Sincronización exitosa" if member_count == expected_member_count else "❌ Error en sincronización")
        return member_count == expected_member_count
    except Chronicle.DoesNotExist:
        print(f"❌ Servidor {guild_id} no encontrado")
        return False

def list_user_servers(user_id):
    """Lista todos los servidores de un usuario"""
    try:
        user = User.objects.get(id=user_id)
        memberships = Member.objects.filter(user=user)
        print(f"Servidores de {user.username}:")
        for member in memberships:
            print(f"  - {member.chronicle.name} (Admin: {member.admin})")
        return len(memberships)
    except User.DoesNotExist:
        print(f"❌ Usuario {user_id} no encontrado")
        return 0

# Ejemplo de uso
if __name__ == "__main__":
    # Reemplazar con IDs reales
    GUILD_ID = 123456789
    USER_ID = 987654321
    EXPECTED_MEMBERS = 10
    
    verify_member_sync(GUILD_ID, EXPECTED_MEMBERS)
    list_user_servers(USER_ID)
```

#### 5.2 Script de Prueba de Logs
```bash
# discord_bots/test_logs.sh
#!/bin/bash

# Función para buscar patrones en logs
check_log_pattern() {
    local pattern="$1"
    local description="$2"
    
    if grep -q "$pattern" bot.log; then
        echo "✅ $description"
    else
        echo "❌ $description - NO ENCONTRADO"
    fi
}

echo "=== Verificación de Logs de Sincronización ==="

# Verificar patrones esperados
check_log_pattern "Sincronizando miembros existentes" "Inicio de sincronización automática"
check_log_pattern "Sincronización completada para" "Fin de sincronización automática"
check_log_pattern "Nuevo miembro se unió" "Evento de nuevo miembro"
check_log_pattern "Usuario.*sincronizado con servidor" "Sincronización OAuth"
check_log_pattern "Sincronización completada.*servidores sincronizados" "Resumen OAuth"

echo "=== Fin de Verificación ==="
```

### 6. Checklist de Pruebas

#### ✅ Pruebas Automáticas
- [ ] Bot se une a servidor → Sincronización automática
- [ ] Nuevo miembro se une → Sincronización automática
- [ ] Login OAuth → Sincronización de servidores
- [ ] Comando `/syncmembers` → Funciona correctamente
- [ ] Rate limits → No hay errores
- [ ] Errores individuales → No interrumpen proceso

#### ✅ Pruebas Manuales
- [ ] Frontend muestra servidores correctamente
- [ ] Permisos de admin se detectan
- [ ] Logs son claros y útiles
- [ ] Progreso visual funciona
- [ ] Estadísticas son precisas

#### ✅ Pruebas de Rendimiento
- [ ] Servidor grande (100+ miembros)
- [ ] Múltiples servidores simultáneos
- [ ] Tiempo de respuesta aceptable
- [ ] No hay memory leaks

### 7. Comandos Útiles para Pruebas

```bash
# Ver logs del bot en tiempo real
tail -f discord_bots/bot.log

# Ver logs del backend
tail -f backend/django.log

# Ejecutar script de verificación
python backend/test_member_sync.py

# Verificar base de datos
python manage.py shell
>>> from chronicle.models import Chronicle, Member
>>> Chronicle.objects.all().count()
>>> Member.objects.all().count()

# Limpiar datos de prueba
python manage.py flush  # ¡CUIDADO! Esto borra toda la BD
```

### 8. Reporte de Pruebas

Después de ejecutar las pruebas, documentar:

1. **Fecha y hora de las pruebas**
2. **Entorno de pruebas** (desarrollo/producción)
3. **Resultados de cada prueba**
4. **Errores encontrados**
5. **Tiempos de ejecución**
6. **Recomendaciones**

### 9. Troubleshooting Común

#### Problema: No se sincronizan miembros
**Solución**: Verificar permisos del bot (Guild Members intent)

#### Problema: Errores de rate limit
**Solución**: Aumentar pausa en `syncGuildMembers.js`

#### Problema: Frontend no muestra servidores
**Solución**: Verificar que las relaciones Member se crearon correctamente

#### Problema: Comando no aparece
**Solución**: Verificar que el comando está registrado en Discord 