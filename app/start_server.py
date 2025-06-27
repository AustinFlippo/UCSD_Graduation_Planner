#!/usr/bin/env python3
"""
Startup script for UCSD Course Advisory API
===========================================

This script starts the FastAPI server with proper error handling
and environment validation.
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv, find_dotenv

# Load the .env file from the root directory
root_env_path = Path(__file__).parent.parent / '.env'
load_dotenv(root_env_path)

env_file = find_dotenv()
print("Loading .env from:", env_file)
load_dotenv(env_file, verbose=True)

def check_environment():
    """Check if required environment variables are set."""
    required_vars = ["OPENAI_API_KEY", "PINECONE_API_KEY"]
    missing_vars = []
    
    print("Checking environment variables...")
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
            print(f"❌ Missing: {var}")
        else:
            print(f"✅ Found: {var}")
    
    if missing_vars:
        print(f"❌ Missing environment variables: {missing_vars}")
        return False
    
    print("✅ All environment variables found")
    return True

def check_dependencies():
    """Check if required packages are installed."""
    try:
        import fastapi
        import uvicorn
        import langchain_openai
        import pinecone
        print("✅ All dependencies found")
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        return False

def main():
    """Start the FastAPI server."""
    
    print("🚀 Starting UCSD Course Advisory API...")
    
    # Check environment
    if not check_environment():
        print("❌ Environment check failed!")
        sys.exit(1)
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # Import and start server
    try:
        import uvicorn
        
        # Get port from environment (Render sets PORT)
        port = int(os.getenv('PORT', 8000))
        host = os.getenv('HOST', '0.0.0.0')
        
        # Environment-aware reload setting
        reload = os.getenv('NODE_ENV') != 'production'
        
        print(f"Starting server on {host}:{port} (reload={reload})")
        
        uvicorn.run(
            "main:app",
            host=host,
            port=port,
            reload=reload,
            log_level="info"
        )
    except KeyboardInterrupt:
        pass
    except Exception:
        sys.exit(1)

if __name__ == "__main__":
    main()