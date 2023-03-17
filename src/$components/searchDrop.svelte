<script>
    
    import { createEventDispatcher } from 'svelte'
    import { fade } from 'svelte/transition'

    import Input from './input.svelte'

    const dispatch = createEventDispatcher()

</script>

<div class="dropdown">
    <div class="dropdown-trigger">
      <Input on:keyup type="text" icon="search"/>
    </div>
    <div class="dropdown-menu" id="dropdown-menu3" role="menu">
      <div class="dropdown-content">
        <a href="#" class="dropdown-item">
          Overview
        </a>
        <a href="#" class="dropdown-item">
          Modifiers
        </a>
        <a href="#" class="dropdown-item">
          Grid
        </a>
        <a href="#" class="dropdown-item">
          Form
        </a>
        <a href="#" class="dropdown-item">
          Elements
        </a>
        <a href="#" class="dropdown-item">
          Components
        </a>
        <a href="#" class="dropdown-item">
          Layout
        </a>
        <hr class="dropdown-divider">
        <a href="#" class="dropdown-item">
          More
        </a>
      </div>
    </div>
  </div>