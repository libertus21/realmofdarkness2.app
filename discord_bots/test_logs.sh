#!/bin/bash

# Script de prueba para verificar logs de sincronización
# Uso: ./test_logs.sh [archivo_log]

# Configuración
LOG_FILE="${1:-bot.log}"
TEMP_FILE="/tmp/sync_test_results.txt"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para buscar patrones en logs
check_log_pattern() {
    local pattern="$1"
    local description="$2"
    local count=$(grep -c "$pattern" "$LOG_FILE" 2>/dev/null || echo "0")
    
    if [ "$count" -gt 0 ]; then
        echo -e "${GREEN}✅ $description (encontrado $count veces)${NC}"
        return 0
    else
        echo -e "${RED}❌ $description - NO ENCONTRADO${NC}"
        return 1
    fi
}

# Función para mostrar líneas de ejemplo
show_examples() {
    local pattern="$1"
    local description="$2"
    
    echo -e "\n${BLUE}📝 Ejemplos de '$description':${NC}"
    grep "$pattern" "$LOG_FILE" | head -3 | while read -r line; do
        echo "   $line"
    done
}

# Función para verificar sincronización reciente
check_recent_sync() {
    local hours="${1:-1}"
    local recent_count=$(find "$LOG_FILE" -mmin -$((hours * 60)) 2>/dev/null | wc -l)
    
    if [ "$recent_count" -gt 0 ]; then
        echo -e "${GREEN}✅ Logs actualizados en las últimas $hours hora(s)${NC}"
    else
        echo -e "${YELLOW}⚠️  Logs no actualizados en las últimas $hours hora(s)${NC}"
    fi
}

# Función para verificar errores
check_errors() {
    local error_count=$(grep -i "error\|exception\|failed" "$LOG_FILE" | wc -l)
    
    if [ "$error_count" -gt 0 ]; then
        echo -e "${YELLOW}⚠️  Encontrados $error_count errores en los logs${NC}"
        echo -e "${BLUE}📝 Últimos 5 errores:${NC}"
        grep -i "error\|exception\|failed" "$LOG_FILE" | tail -5 | while read -r line; do
            echo "   $line"
        done
    else
        echo -e "${GREEN}✅ No se encontraron errores en los logs${NC}"
    fi
}

# Función para verificar rate limits
check_rate_limits() {
    local rate_limit_count=$(grep -i "rate limit\|429\|too many requests" "$LOG_FILE" | wc -l)
    
    if [ "$rate_limit_count" -gt 0 ]; then
        echo -e "${YELLOW}⚠️  Encontrados $rate_limit_count rate limits en los logs${NC}"
        echo -e "${BLUE}📝 Últimos rate limits:${NC}"
        grep -i "rate limit\|429\|too many requests" "$LOG_FILE" | tail -3 | while read -r line; do
            echo "   $line"
        done
    else
        echo -e "${GREEN}✅ No se encontraron rate limits en los logs${NC}"
    fi
}

# Función para mostrar estadísticas de sincronización
show_sync_stats() {
    echo -e "\n${BLUE}📊 Estadísticas de Sincronización:${NC}"
    
    local total_syncs=$(grep -c "Sincronización completada" "$LOG_FILE" 2>/dev/null || echo "0")
    local total_members=$(grep -c "Nuevo miembro se unió" "$LOG_FILE" 2>/dev/null || echo "0")
    local total_oauth=$(grep -c "Usuario.*sincronizado con servidor" "$LOG_FILE" 2>/dev/null || echo "0")
    
    echo "   🔄 Sincronizaciones automáticas: $total_syncs"
    echo "   👤 Nuevos miembros: $total_members"
    echo "   🔐 Sincronizaciones OAuth: $total_oauth"
}

# Función principal
main() {
    echo -e "${BLUE}🧪 Verificación de Logs de Sincronización de Miembros${NC}"
    echo "=================================================="
    
    # Verificar que el archivo de log existe
    if [ ! -f "$LOG_FILE" ]; then
        echo -e "${RED}❌ Archivo de log '$LOG_FILE' no encontrado${NC}"
        echo "Uso: $0 [archivo_log]"
        exit 1
    fi
    
    echo -e "${BLUE}📁 Archivo de log: $LOG_FILE${NC}"
    echo -e "${BLUE}📏 Tamaño: $(du -h "$LOG_FILE" | cut -f1)${NC}"
    echo -e "${BLUE}📅 Última modificación: $(stat -c %y "$LOG_FILE")${NC}"
    
    # Verificar logs recientes
    check_recent_sync 1
    echo ""
    
    # Verificar patrones esperados
    echo -e "${BLUE}🔍 Verificando patrones de sincronización:${NC}"
    
    local all_passed=true
    
    check_log_pattern "Sincronizando miembros existentes" "Inicio de sincronización automática" || all_passed=false
    check_log_pattern "Sincronización completada para.*miembros" "Fin de sincronización automática" || all_passed=false
    check_log_pattern "Nuevo miembro se unió" "Evento de nuevo miembro" || all_passed=false
    check_log_pattern "Usuario.*sincronizado con servidor" "Sincronización OAuth" || all_passed=false
    check_log_pattern "Sincronización completada.*servidores sincronizados" "Resumen OAuth" || all_passed=false
    check_log_pattern "Iniciando sincronización manual" "Comando manual ejecutado" || all_passed=false
    
    # Mostrar ejemplos si se encontraron patrones
    if grep -q "Sincronizando miembros existentes" "$LOG_FILE"; then
        show_examples "Sincronizando miembros existentes" "Sincronización automática"
    fi
    
    if grep -q "Nuevo miembro se unió" "$LOG_FILE"; then
        show_examples "Nuevo miembro se unió" "Nuevos miembros"
    fi
    
    if grep -q "Usuario.*sincronizado con servidor" "$LOG_FILE"; then
        show_examples "Usuario.*sincronizado con servidor" "Sincronización OAuth"
    fi
    
    # Verificar errores
    echo ""
    check_errors
    
    # Verificar rate limits
    echo ""
    check_rate_limits
    
    # Mostrar estadísticas
    show_sync_stats
    
    # Resumen final
    echo ""
    echo "=================================================="
    if [ "$all_passed" = true ]; then
        echo -e "${GREEN}✅ Todos los patrones de sincronización encontrados${NC}"
    else
        echo -e "${YELLOW}⚠️  Algunos patrones no fueron encontrados${NC}"
        echo -e "${BLUE}💡 Esto puede ser normal si no se han ejecutado sincronizaciones recientemente${NC}"
    fi
    
    echo -e "${BLUE}📝 Para ver logs en tiempo real: tail -f $LOG_FILE${NC}"
}

# Ejecutar función principal
main "$@" 