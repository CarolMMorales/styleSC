<template>
    <h1>asesores</h1>
  
  </template>
  
  
  
  <style>
  .card-img-top {
    width: 50%;
    height: auto;
  }
  
  .back {
    background-color: hsla(229, 100%, 74%, 0.493);
    margin: 2%  ;
    border-radius: 15px;
    position: relative;
    
  }
  
  .top-0 {
    top: 0;
    /* La imagen estará en la parte superior del contenedor */
  }
  
  .start-100 {
    left: 100%;
    /* La imagen estará a la derecha del contenedor */
  }
  
  .translate-middle {
    transform: translate(50%);
    /* Centra la imagen vertical y horizontalmente */
  }
  .btn-custom {
    background-color: var(--blue-color);
    color: #ffffff;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  .btn-custom:hover {
    background-color: var(----color-background);
    color: var(--blue-color);
    border: 2px solid var(--blue-color);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    transition: 0.5s ease;
  }
  
  .btn-cancel {
    background-color: var(--button-red-color);
    color: #ffffff;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  .btn-cancel:hover {
    background-color: var(----color-background);
    color: var(--button-red-color);
    border: 2px solid var(--button-red-color);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    transition: 0.5s ease;
  }
  
  .figure {
    position: relative;
    width: 50%;
    height: 0;
    padding-top: 50%;
    overflow: hidden;
    border-radius: 2%;
  }
  
  .figure img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: center top; /* La imagen se recortará desde la parte superior si es necesario, pero se centrará en la parte inferior */
  }
  
  
  .overlayPefil {
      position: absolute;
      margin-left: 25%;
      bottom: 22px; /* Coloca el elemento en la parte inferior del div */
      left: 0;
      width: 50%;
      height: 20%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.3s ease;
  }
   .overlayPefil:hover{
    cursor: pointer;
   }
  
  .ri-pencil-line {
    color: #fff;
    font-size: 24px; /* Tamaño del icono */
  }
  
  .ri-pencil-line {
    color: #fff;
    font-size: 24px; /* Tamaño del icono */
  }
  
  </style>