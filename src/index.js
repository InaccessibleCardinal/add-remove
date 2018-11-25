//entry point, when client ready, invoke app()
//app is NOT a component
import app from './app';
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', app);
}