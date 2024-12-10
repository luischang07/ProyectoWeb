<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import '../../../firebase/config.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const correo = ref('');
const clave = ref('');
const error = ref<string | null>(null);
const router = useRouter();

const entradaUsuario = async () => {
    error.value = null;
    try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, correo.value, clave.value);
        router.push({ name: 'personal' });
    } catch (err) {
        switch ((err as any).code) {
            case 'auth/user-not-found':
                error.value = 'Usuario no encontrado';
                break;
            case 'auth/wrong-password':
                error.value = "Contraseña incorrecta";
                break;
            default:
                error.value = "Error al iniciar sesión";
                break;
        }
    }
}


</script>

<template>
    <div class="container-form-wrapper">
        <div class="container-form">
            <form class="mx-auto p-4" @submit.prevent="entradaUsuario">
                <h2 class="text-center mb-4">Login</h2>
                <div v-if="error" class="alert alert-danger text-center mb-3">
                    {{ error }}
                </div>
                <div class="mb-3">
                    <label for="correo" class="form-label">Correo:</label>
                    <input id="correo" type="email" class="form-control" v-model="correo" required>
                </div>
                <div class="mb-3">
                    <label for="clave" class="form-label">Contraseña:</label>
                    <input id="clave" type="password" class="form-control" v-model="clave" required>
                    <span class="fs-6 text-secondary fw-lighter">
                        No tienes cuenta? <RouterLink class="btn-nav" to="/registrar">
                            Regístrate aquí
                        </RouterLink>
                    </span>
                </div>
                <button type="submit" class="btn btn-dark w-100">
                    Entrar
                </button>
            </form>
        </div>
    </div>
</template>

<style>
.container-form {
    flex: 1;
    margin: 4%;
    max-width: 450px;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.container-form-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 80vh;
}
</style>
