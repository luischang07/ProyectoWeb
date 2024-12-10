<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import '../../../firebase/config.js';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
const correo = ref('');
const clave = ref('');
const error = ref<string | null>(null);
const router = useRouter();

const registrarUsuario = async () => {
    error.value = null;
    try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, correo.value, clave.value);
        router.push({ name: 'Bienvenida' });
    } catch (err) {
        switch ((err as any).code) {
            case 'auth/email-already-in-use':
                error.value = 'El correo ya está en uso';
                break;
            case 'auth/weak-password':
                error.value = "La contraseña debe tener al menos 6 caracteres";
                break;
            default:
                error.value = "Error al registrar el usuario";
                break;
        }
    }
}


</script>

<template>
    <div class="container-form-wrapper">

        <div class="container-form">
            <form class="mx-auto p-4" @submit.prevent="registrarUsuario">
                <h2 class="text-center mb-4">Registro</h2>
                <div v-if="error" class="alert alert-danger text-center mb-3">
                    {{ error }}
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Correo:</label>
                    <input id="email" type="email" class="form-control" v-model="correo" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Contraseña:</label>
                    <input id="password" type="password" class="form-control" v-model="clave" required>
                    <span class="fs-6 text-secondary fw-lighter">
                        Ya tienes cuenta? <RouterLink class="btn-nav" to="/validacion">
                            Iniciar Sesión
                        </RouterLink>
                    </span>
                </div>
                <button type="submit" class="btn btn-dark w-100">
                    Registrar
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
