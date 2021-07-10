<template>
 <section class="booking-modifications">
   <form>
     <div class="row">
       <div class="col-12 col-md-6 pe-5 mb-3">
         <label for="name" class="form-label">Customer Name</label>
         <input type="text" v-model="booking.name" class="form-control" id="name">
       </div>
       <div class="col-12 col-md-6 ps-5 mb-3">
         <label for="name" class="form-label">Customer Phone Number</label>
         <input type="tel" v-model="booking.phone" class="form-control" id="phone">
       </div>
     </div>
     <div class="row">
       <div class="col-12 col-md-6 pe-5 mb-3">
         <label for="date" class="form-label">Booking Date</label>
         <input type="date" @change="validateDate($event)" class="form-control" id="date">
       </div>
       <div class="col-12 col-md-6 ps-5 mb-3">
         <label for="room" class="form-label">Room Name</label>
         <select class="form-select" id="room" v-model="booking.room">
           <option value="" disabled selected>Select Room</option>
           <option v-for="item in rooms" :key="item.id" :value="item.id">
             {{item.title}}
           </option>
         </select>
       </div>
     </div>
     <div class="row">
       <div class="col-12 col-md-6 pe-5 mb-3">
         <label for="duration" class="form-label">Booking Duration</label>
         <select class="form-select" id="duration" v-model="booking.duration">
           <option disabled selected>Select Duration</option>
           <option v-for="item in durations" :value="item.id" :key="item.id">
             {{ item.title }}
           </option>
         </select>
       </div>
       <div class="col-12 col-md-6 ps-5 mb-3">
         <label for="beds" class="form-label">Number Of Beds</label>
         <select class="form-select" id="beds" v-model="booking.beds">
           <option selected disabled>Select Beds</option>
           <option value="1">1</option>
           <option value="2">2</option>
         </select>
       </div>
     </div>
     <div class="row">
       <div class="col-12 col-md-6 pe-5 mb-3">
         <label for="price" class="form-label">Price</label>
         <input type="text" class="form-control" id="price" v-model="price">
       </div>
       <div class="col-12 col-md-6 ps-5 mb-3">
         <label class="form-label"></label>
         <div class="row mt-2">
           <div class="col-6 ">
             <button type="submit" class="btn create-btn  w-100">Submit</button>
           </div>
           <div class="col-6">
             <button @click="cancel" type="button" class="btn btn-secondary w-100">Cancel</button>
           </div>
         </div>
       </div>
     </div>
   </form>
 </section>
</template>

<script src="./booking-modifications.js"></script>
<style src="./booking-modifications.scss" lang="scss" scoped></style>
