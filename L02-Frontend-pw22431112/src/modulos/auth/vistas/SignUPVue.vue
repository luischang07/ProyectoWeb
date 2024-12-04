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
    <div class="container mt-5">
        <form class="card shadow w-50 mx-auto" @submit.prevent="registrarUsuario">
            <h2 class="card-header text-center">Registro</h2>
            <div class="card-body">
                <div class="alert alert-danger text-center" v-if="error">
                    {{ error }} 
                </div>
                <div class="mb-3">
                    <label class="form-label">Correo:</label>
                    <input type="email" class="form-control" v-model="correo" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Contraseña:</label>
                    <input type="password" class="form-control" v-model="clave" required>
                    <span class="fs-6 text-secondary fw-lighter" style="cursor: pointer" @click="router.push('/validacion')">
                    Ya tienes cuenta? <a href="">Inicia sesión aquí</a>
                    </span>
                </div>

                <button type="submit" class="btn btn-primary w-100">
                    Registrar
                </button>
            </div>
        </form>
    </div>
    
</template>
