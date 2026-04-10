import re
import sys

def check_format(file_path):
    print(f"Validando formato de {file_path}...")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        errors = 0
        for i, line in enumerate(lines):
            # Buscar patrones de enlaces: - [Nombre](URL): Descripción
            if line.strip().startswith('- ['):
                if not re.search(r'- \[.*\]\(.*\): .*', line):
                    print(f"Línea {i+1} posible formato incorrecto: {line.strip()}")
                    errors += 1
        
        if errors == 0:
            print("Formato consistente.")
        else:
            print(f"Se encontraron {errors} posibles errores de formato.")
            
    except Exception as e:
        print(f"Error procesando el archivo: {e}")

if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "README.md"
    check_format(path)
