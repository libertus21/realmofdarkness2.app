#!/usr/bin/env python3
"""
Script de prueba para verificar la sincronización automática de miembros
"""

import os
import sys
import django
from django.conf import settings

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rod.settings')
django.setup()

from chronicle.models import Chronicle, Member
from discordauth.models import User

def verify_member_sync(guild_id, expected_member_count):
    """
    Verifica que la sincronización de miembros fue exitosa
    
    Args:
        guild_id (int): ID del servidor de Discord
        expected_member_count (int): Número esperado de miembros
    
    Returns:
        bool: True si la sincronización fue exitosa
    """
    try:
        chronicle = Chronicle.objects.get(id=guild_id)
        member_count = Member.objects.filter(chronicle=chronicle).count()
        
        print(f"🔍 Verificando servidor: {chronicle.name}")
        print(f"   📊 Miembros esperados: {expected_member_count}")
        print(f"   📊 Miembros en BD: {member_count}")
        
        if member_count == expected_member_count:
            print(f"   ✅ Sincronización exitosa")
            return True
        else:
            print(f"   ❌ Error en sincronización")
            print(f"   📝 Diferencia: {expected_member_count - member_count}")
            return False
            
    except Chronicle.DoesNotExist:
        print(f"❌ Servidor {guild_id} no encontrado en la base de datos")
        return False

def list_user_servers(user_id):
    """
    Lista todos los servidores de un usuario
    
    Args:
        user_id (int): ID del usuario de Discord
    
    Returns:
        int: Número de servidores del usuario
    """
    try:
        user = User.objects.get(id=user_id)
        memberships = Member.objects.filter(user=user).select_related('chronicle')
        
        print(f"👤 Servidores de {user.username}#{user.discriminator}:")
        
        if not memberships:
            print("   📝 No tiene servidores registrados")
            return 0
        
        for member in memberships:
            admin_status = "👑 Admin" if member.admin else "👤 Miembro"
            print(f"   - {member.chronicle.name} ({admin_status})")
        
        return len(memberships)
        
    except User.DoesNotExist:
        print(f"❌ Usuario {user_id} no encontrado en la base de datos")
        return 0

def check_guild_members(guild_id):
    """
    Muestra información detallada de los miembros de un servidor
    
    Args:
        guild_id (int): ID del servidor de Discord
    """
    try:
        chronicle = Chronicle.objects.get(id=guild_id)
        members = Member.objects.filter(chronicle=chronicle).select_related('user')
        
        print(f"📋 Miembros del servidor {chronicle.name}:")
        
        if not members:
            print("   📝 No hay miembros registrados")
            return
        
        for member in members:
            admin_status = "👑" if member.admin else "👤"
            print(f"   {admin_status} {member.user.username}#{member.user.discriminator}")
            
    except Chronicle.DoesNotExist:
        print(f"❌ Servidor {guild_id} no encontrado")

def get_sync_statistics():
    """
    Muestra estadísticas generales de sincronización
    """
    total_guilds = Chronicle.objects.count()
    total_members = Member.objects.count()
    total_users = User.objects.count()
    
    print("📊 Estadísticas de Sincronización:")
    print(f"   🏠 Servidores totales: {total_guilds}")
    print(f"   👥 Relaciones de miembro: {total_members}")
    print(f"   👤 Usuarios registrados: {total_users}")
    
    if total_guilds > 0:
        avg_members = total_members / total_guilds
        print(f"   📈 Promedio de miembros por servidor: {avg_members:.1f}")

def main():
    """
    Función principal del script
    """
    print("🧪 Script de Verificación de Sincronización de Miembros")
    print("=" * 60)
    
    # Mostrar estadísticas generales
    get_sync_statistics()
    print()
    
    # Verificar servidores específicos (reemplazar con IDs reales)
    test_cases = [
        # (guild_id, expected_members)
        # Agregar casos de prueba aquí
    ]
    
    if test_cases:
        print("🔍 Verificando casos de prueba específicos:")
        for guild_id, expected_members in test_cases:
            verify_member_sync(guild_id, expected_members)
            print()
    
    # Verificar usuarios específicos (reemplazar con IDs reales)
    test_users = [
        # user_id
        # Agregar usuarios de prueba aquí
    ]
    
    if test_users:
        print("👤 Verificando usuarios específicos:")
        for user_id in test_users:
            list_user_servers(user_id)
            print()
    
    print("✅ Verificación completada")

if __name__ == "__main__":
    # Si se pasan argumentos, usar como casos de prueba
    if len(sys.argv) > 1:
        if sys.argv[1] == "stats":
            get_sync_statistics()
        elif sys.argv[1] == "guild" and len(sys.argv) > 2:
            guild_id = int(sys.argv[2])
            check_guild_members(guild_id)
        elif sys.argv[1] == "user" and len(sys.argv) > 2:
            user_id = int(sys.argv[2])
            list_user_servers(user_id)
        elif sys.argv[1] == "verify" and len(sys.argv) > 3:
            guild_id = int(sys.argv[2])
            expected_members = int(sys.argv[3])
            verify_member_sync(guild_id, expected_members)
        else:
            print("Uso:")
            print("  python test_member_sync.py stats                    # Estadísticas generales")
            print("  python test_member_sync.py guild <guild_id>         # Ver miembros de un servidor")
            print("  python test_member_sync.py user <user_id>           # Ver servidores de un usuario")
            print("  python test_member_sync.py verify <guild_id> <count> # Verificar sincronización")
    else:
        main() 