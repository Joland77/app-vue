<script setup>
import { defineProps } from 'vue';
import { defineEmits } from 'vue';

const props = defineProps({
    visible : Boolean,
    index : Number,
    movie : String,
});

const emit = defineEmits(['actions']);
</script>


<template>
<div v-if="props.visible == true" id='popup'>
    <p>Êtes vous sur de vouloir supprimer : {{ movie }}</p>
    <div id="buttons">
    <button @click="emit('actions','confirm')">Oui!</button>
    <button @click="emit('actions','deny')">Non!</button>
    </div>
</div>
</template>

<style scoped>

#buttons
{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    
    width: 100%;
    margin-bottom: 12px;
}

#popup p
{
    
    font-family: Helvetica;
    font-size: 18px;
    
}

#popup
{
    
    padding: 12px;
    position: fixed;
    top: 20%;
    width: auto;
    height: auto;
    background-color: azure;

    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-self: center;
    border-radius: 4px;
    border: solid 1px black;
}

</style>