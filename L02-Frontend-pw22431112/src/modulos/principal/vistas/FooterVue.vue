<script lang="ts" setup>
</script>

<template>
    <footer class="footer py-3 bg-dark">
        <div class="container">
            <a href="/Bienvenida" class="navbar-brand text-white fw-bold brand-size brand-style logo">
                <i class="bi bi-shop-window"></i> Tienda
            </a>
            <div class="elementos-footer text-center">
                <div class="col">
                    <ul class="list-unstyled">
                        <li>
                            <p class="text-white">Lopez Perez José Luis</p>
                        </li>
                        <li>
                            <a class="text-white me-2" href="https://github.com/LuisL16-ui">
                                <i class="bi bi-github"></i>
                            </a>
                            <a class="text-white me-2" href="https://www.facebook.com/profile.php?id=100010351993573">
                                <i class="bi bi-facebook"></i>
                            </a>
                            <a class="text-white"
                                href="https://www.instagram.com/luis_3bc/profilecard/?igsh=MWUwbjBycDRoNjRkZw==">
                                <i class="bi bi-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col">
                    <ul class="list-unstyled">
                        <li>
                            <p class="text-white">Acosta Chang Luis Xavier</p>
                        </li>
                        <li>
                            <a class="text-white me-2" href="https://github.com/luischang07">
                                <i class="bi bi-github"></i>
                            </a>
                            <a href="" class="text-white me-2">
                                <i class="bi bi-facebook"></i>
                            </a>
                            <a href="" class="text-white">
                                <i class="bi bi-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col">
                    <ul class="list-unstyled">
                        <li>
                            <p class="text-white">Ruelas Gutiérrez Maia Paulina</p>
                        </li>
                        <li>
                            <a class="text-white me-2" href="">
                                <i class="bi bi-github"></i>
                            </a>
                            <a class="text-white me-2" href="">
                                <i class="bi bi-facebook"></i>
                            </a>
                            <a class="text-white me-2"
                                href="https://www.instagram.com/maia_ruelas?igsh=ZWtta3hrbjFtdmY4">
                                <i class="bi bi-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col">
                    <ul class="list-unstyled">
                        <li>
                            <p class="text-white">Espinoza Felix Fausto Gabriel</p>
                        </li>
                        <li>
                            <a class="text-white me-2" href="">
                                <i class="bi bi-github"></i>
                            </a>
                            <a class="text-white me-2" href="">
                                <i class="bi bi-facebook"></i>
                            </a>
                            <a class="text-white me-2" href="">
                                <i class="bi bi-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col-12 mb-2">
                    <span class="text-center text">Made with <i class="bi bi-heart-fill text-danger"></i> by Our
                        Team</span>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.passport-photo {
    width: 100px;
    height: 100px;
    object-fit: cover;
}

.text {
    color: #aaa;
}

a {
    text-decoration: none;
}

.footer {
    margin-top: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    width: 100%;
}

.elementos-footer {
    margin-left: 5rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    align-items: center;
}

.elementos-footer .col-12 {
    grid-column: span 4;
    text-align: center;
}

.logo {
    font-size: 2rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s;
}

.logo:hover {
    transform: scale(1.1);
}

@media (max-width: 768px) {
    .elementos-footer {
        margin-left: 0;
        grid-template-columns: 1fr 1fr;
    }

    .elementos-footer .col-12 {
        grid-column: span 2;
    }
}

@media (max-width: 480px) {
    .elementos-footer {
        grid-template-columns: 1fr;
    }

    .elementos-footer .col-12 {
        grid-column: span 1;
    }
}
</style>
