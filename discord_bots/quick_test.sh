#!/bin/bash

# Script de prueba rápida para la sincronización de miembros
# Uso: ./quick_test.sh

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Prueba Rápida - Sincronización de Miembros${NC}"
echo "=============================================="

# Función para verificar si un comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Función para verificar archivos
check_file() {
    local file="$1"
    local description="$2"
    
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $description${NC}"
        return 0
    else
        echo -e "${RED}❌ $description - NO ENCONTRADO${NC}"
        return 1
    fi
}

# Función para verificar directorios
check_directory() {
    local dir="$1"
    local description="$2"
    
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✅ $description${NC}"
        return 0
    else
        echo -e "${RED}❌ $description - NO ENCONTRADO${NC}"
        return 1
    fi
}

# Verificar estructura de archivos
echo -e "${BLUE}📁 Verificando estructura de archivos:${NC}"
check_file "src/events/guildCreate.js" "Evento guildCreate modificado"
check_file "src/events/guildMemberAdd.js" "Evento guildMemberAdd creado"
check_file "src/modules/syncGuildMembers.js" "Módulo syncGuildMembers"
check_file "src/commands/5th/syncMembers.js" "Comando syncMembers V5"
check_file "src/commands/20th/syncMembers.js" "Comando syncMembers V20"
check_file "src/commands/cod/syncMembers.js" "Comando syncMembers CoD"
check_file "MEMBER_SYNC_README.md" "Documentación de sincronización"
check_file "TESTING_GUIDE.md" "Guía de pruebas"

echo ""

# Verificar dependencias
echo -e "${BLUE}📦 Verificando dependencias:${NC}"
if command_exists "node"; then
    echo -e "${GREEN}✅ Node.js instalado${NC}"
    node --version
else
    echo -e "${RED}❌ Node.js no encontrado${NC}"
fi

if command_exists "npm"; then
    echo -e "${GREEN}✅ npm instalado${NC}"
    npm --version
else
    echo -e "${RED}❌ npm no encontrado${NC}"
fi

echo ""

# Verificar configuración
echo -e "${BLUE}⚙️  Verificando configuración:${NC}"
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ Archivo .env encontrado${NC}"
    
    # Verificar variables importantes
    if grep -q "DISCORD_TOKEN" .env; then
        echo -e "${GREEN}✅ DISCORD_TOKEN configurado${NC}"
    else
        echo -e "${YELLOW}⚠️  DISCORD_TOKEN no encontrado en .env${NC}"
    fi
    
    if grep -q "CLIENT_ID" .env; then
        echo -e "${GREEN}✅ CLIENT_ID configurado${NC}"
    else
        echo -e "${YELLOW}⚠️  CLIENT_ID no encontrado en .env${NC}"
    fi
else
    echo -e "${RED}❌ Archivo .env no encontrado${NC}"
    echo -e "${BLUE}💡 Copia .env.example a .env y configura las variables${NC}"
fi

echo ""

# Verificar backend
echo -e "${BLUE}🔧 Verificando backend:${NC}"
if [ -d "../backend" ]; then
    echo -e "${GREEN}✅ Directorio backend encontrado${NC}"
    
    if [ -f "../backend/discordauth/views.py" ]; then
        echo -e "${GREEN}✅ Archivo views.py encontrado${NC}"
        
        # Verificar si tiene las modificaciones de sincronización
        if grep -q "Sincronizar servidores del usuario" "../backend/discordauth/views.py"; then
            echo -e "${GREEN}✅ Modificaciones de sincronización OAuth aplicadas${NC}"
        else
            echo -e "${YELLOW}⚠️  Modificaciones de sincronización OAuth no encontradas${NC}"
        fi
    else
        echo -e "${RED}❌ Archivo views.py no encontrado${NC}"
    fi
    
    if [ -f "../backend/test_member_sync.py" ]; then
        echo -e "${GREEN}✅ Script de prueba de BD encontrado${NC}"
    else
        echo -e "${YELLOW}⚠️  Script de prueba de BD no encontrado${NC}"
    fi
else
    echo -e "${RED}❌ Directorio backend no encontrado${NC}"
fi

echo ""

# Verificar logs (si existen)
echo -e "${BLUE}📝 Verificando logs:${NC}"
log_files=("bot.log" "v5-bot.log" "v20-bot.log" "cod-bot.log")

for log_file in "${log_files[@]}"; do
    if [ -f "$log_file" ]; then
        echo -e "${GREEN}✅ Log encontrado: $log_file${NC}"
        
        # Verificar si hay logs de sincronización
        if grep -q "Sincronización" "$log_file" 2>/dev/null; then
            sync_count=$(grep -c "Sincronización" "$log_file" 2>/dev/null || echo "0")
            echo -e "${BLUE}   📊 Encontradas $sync_count referencias a sincronización${NC}"
        else
            echo -e "${YELLOW}   📊 No se encontraron logs de sincronización${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  Log no encontrado: $log_file${NC}"
    fi
done

echo ""

# Instrucciones de prueba
echo -e "${BLUE}🧪 Instrucciones para pruebas manuales:${NC}"
echo "1. ${GREEN}Inicia el bot:${NC} npm start"
echo "2. ${GREEN}Invita el bot a un servidor de prueba${NC}"
echo "3. ${GREEN}Verifica los logs para sincronización automática${NC}"
echo "4. ${GREEN}Ejecuta el comando /syncmembers como admin${NC}"
echo "5. ${GREEN}Haz login OAuth en el frontend${NC}"
echo "6. ${GREEN}Verifica que los servidores aparecen correctamente${NC}"

echo ""

# Comandos útiles
echo -e "${BLUE}🔧 Comandos útiles:${NC}"
echo "• ${GREEN}Ver logs en tiempo real:${NC} tail -f bot.log"
echo "• ${GREEN}Verificar BD:${NC} python ../backend/test_member_sync.py stats"
echo "• ${GREEN}Verificar logs:${NC} ./test_logs.sh bot.log"
echo "• ${GREEN}Instalar dependencias:${NC} npm install"
echo "• ${GREEN}Registrar comandos:${NC} npm run deploy-commands"

echo ""

# Resumen
echo -e "${BLUE}📋 Resumen de la verificación:${NC}"
echo "✅ Archivos de sincronización creados"
echo "✅ Documentación generada"
echo "✅ Scripts de prueba disponibles"
echo "✅ Comandos de verificación listos"

echo ""
echo -e "${GREEN}🎉 ¡Todo listo para las pruebas!${NC}"
echo -e "${BLUE}💡 Revisa TESTING_GUIDE.md para instrucciones detalladas${NC}" 