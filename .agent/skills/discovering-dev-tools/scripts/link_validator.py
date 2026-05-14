import urllib.request
import signal
import sys
import json

# Configuración de timeout para evitar bloqueos
TIMEOUT = 10

def check_url(url):
    """Verifica si una URL está activa y devuelve un status 200 OK."""
    try:
        # User-Agent para evitar bloqueos de algunos servidores que rechazan scripts
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=TIMEOUT) as response:
            return response.getcode() == 200
    except Exception as e:
        print(f"Error validando {url}: {e}")
        return False

def main():
    if len(sys.argv) < 2:
        print("Uso: python link_validator.py <url1> <url2> ...")
        sys.exit(1)

    urls = sys.argv[1:]
    results = {}
    
    print(f"Validando {len(urls)} enlaces...")
    
    for url in urls:
        is_valid = check_url(url)
        results[url] = "VALIDO" if is_valid else "CAIDO"
        print(f"[{results[url]}] {url}")

    # Si se detectan caídos, el script puede ser usado para filtrar en el flujo del agente
    valid_urls = [u for u, status in results.items() if status == "VÁLIDO ✅"]
    
    # Podríamos imprimir JSON para que el agente lo procese si fuera necesario
    # print(json.dumps(valid_urls))

if __name__ == "__main__":
    main()
