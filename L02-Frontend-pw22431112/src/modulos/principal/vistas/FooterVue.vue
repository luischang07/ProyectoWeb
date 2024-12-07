<script lang="ts" setup>
</script>

<template>
    <footer class="footer py-3 bg-dark">
        <div class="container">
            <a href="/Bienvenida" class="navbar-brand text-white fw-bold brand-size brand-style logo">
                <i class="bi bi-shop-window"></i> Tienda
            </a>
            <div class="row text-white text-center mt-2">
                <div class="col-12 mb-2">
                    <h5 class="text-center">Made with <i class="bi bi-heart-fill text-danger"></i> by</h5>
                </div>
                <div class="col">
                    <ul class="list-unstyled">
                        <li><p class="text-white">Lopez Perez José Luis</p></li>
                        <li><a class="text-white" href="https://github.com/LuisL16-ui"><i class="bi bi-github"></i></a> <a href="https://www.facebook.com/profile.php?id=100010351993573" class="text-white"> <i class="bi bi-facebook"></i></a> <a href="https://www.instagram.com/luis_3bc/profilecard/?igsh=MWUwbjBycDRoNjRkZw==" class="text-white"><i class="bi bi-instagram"></i></a>  </li>
                    </ul>
                </div>
                <div class="col">
                    <ul class="list-unstyled">
                        <li><p class="text-white">Acosta Chang Luis Xavier</p></li>
                        <li><a class="text-white" href="https://github.com/luischang07"><i class="bi bi-github"></i></a> <a href="" class="text-white"> <i class="bi bi-facebook"></i></a> <a href="" class="text-white"><i class="bi bi-instagram"></i></a>  </li>
                    </ul>
                </div>
                <div class="col">
                    <ul class="list-unstyled">
                        <li><p class="text-white">Ruelas Gutiérrez Maia Paulina</p></li>
                        <li><p></p></li>
                        <li><a class="text-white" href=""><i class="bi bi-github"></i></a> <a href="" class="text-white"> <i class="bi bi-facebook"></i></a> <a href="https://www.instagram.com/maia_ruelas?igsh=ZWtta3hrbjFtdmY4 " class="text-white"><i class="bi bi-instagram"></i></a>  </li>
                    </ul>
                </div>
                <div class="col">
                    <ul class="list-unstyled">
                        <li><p class="text-white">Espinoza Felix Fausto Gabriel</p></li>
                        <li><a class="text-white" href=""><i class="bi bi-github"></i></a> <a href="" class="text-white"> <i class="bi bi-facebook"></i></a> <a href="" class="text-white"><i class="bi bi-instagram"></i></a>  </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.passport-photo {
    width: 100px; /* Adjust the width as needed */
    height: 100px; /* Adjust the height as needed */
    object-fit: cover;
}
a {
    text-decoration: none;
}
.footer {
    margin-top: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
}
.logo {
    font-size: 2rem; /* Increase the font size */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Add a shadow */
    transition: transform 0.3s; /* Add a transition effect */
}
.logo:hover {
    transform: scale(1.1); /* Scale up on hover */
}
</style>
