<script>
import { navigateTo } from 'svelte-router-spa';

	import UserLogin from '../users/user.login.svelte'
	import UserRegister from '../users/user.create.svelte'
    import User from '../users/user.login.svelte';

	let logIn = true

	function setChange () {
		logIn = !logIn
	}

</script>

<style>

	div.bg{
		background-image: linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url('/images/building.jpg');
		width:-webkit-fill-available;
		opacity: 70%;
		height:-webkit-fill-available;
		background-position: center;
		background-size: cover;
		position: absolute;
		top: 0;
		left: 0;
	}

	div.container{
		margin-top: 10rem;
		transition: all;
	}

	@media(min-width: 768px){
		div.container{
		margin-top: 15rem !important;
		}

		.is-flex{
		display: flex;
		flex-flow:row wrap !important;
		gap:1rem;
		justify-content: space-evenly;
		}
	}
	span{
		color:rgb(125, 125, 218);
	}
	h1{
		text-align: center;
		text-align-last: center;
	}
	
	.is-flex{
		display: flex;
		flex-flow: column wrap;
		gap:1rem;
	}

	div.columns{
		margin: 0 0 0 0 !important;
	}

	div.container{
		overflow: hidden;
	}

</style>

<div class="bg">
</div>
<div class="container">
	<div class="columns is-desktop">
		<div class="column is-half is-10-mobile is-offset-one-quarter is-offset-1-mobile ">
			<div class="card">
					<div class="card-content">
						<div class="content mt-4">
							<h1 class="title is-4"><i class="fas fa-eye"></i>  Administrador de <span>Pagos</span></h1>
								<UserLogin/>
								<div class="mt-4 is-flex">
									<a on:click={()=>{navigateTo('forgot-my-password')}}>Olvide mi contraseña</a>
								</div>
						</div>
					</div>
			</div>
		</div> 
	</div>
	</div>

