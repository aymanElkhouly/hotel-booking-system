<template>
 <section class="booking-list mt-4">
   <div class="row">
     <div class="col-12 col-md-6">
       <input type="text" class="form-control"  placeholder="Search by customer name">
     </div>
     <div class="col-8 col-md-4 mt-md-0 mt-2">
       <select class="form-select">
         <option selected>Filter by room name</option>
         <option value="1">One</option>
         <option value="2">Two</option>
         <option value="3">Three</option>
         </select>
     </div>
     <div class="col-4 col-md-2 mt-md-0 mt-2">
       <button class="btn btn-primary float-end clearfix create-btn">
         +  Create
       </button>
     </div>
   </div>
   <div class="row mt-4">
     <div class="col-12">
       <table class="table table-hover table-responsive bg-white">
         <thead>
         <tr>
           <th scope="col">#</th>
           <th scope="col">Customer Name</th>
           <th scope="col">Room Name</th>
           <th scope="col">Booking Date</th>
           <th scope="col">Booking Duration</th>
           <th scope="col"># Of Beds</th>
           <th scope="col">price</th>
           <th scope="col">Actions</th>
         </tr>
         </thead>
         <tbody>
         <tr>
           <th scope="row">1</th>
           <td>Mark</td>
           <td>Otto</td>
           <td>@mdo</td>
           <td>Mark</td>
           <td>Otto</td>
           <td>@mdo</td>
           <td>@mdo</td>
         </tr>
         <tr>
           <th scope="row">2</th>
           <td>Mark</td>
           <td>Otto</td>
           <td>@mdo</td>
           <td>Mark</td>
           <td>Otto</td>
           <td>@mdo</td>
           <td>@mdo</td>
         </tr>
         <tr>
           <th scope="row">3</th>
           <td>Mark</td>
           <td>Otto</td>
           <td>@mdo</td>
           <td>Mark</td>
           <td>Otto</td>
           <td>@mdo</td>
           <td>@mdo</td>
         </tr>
         </tbody>
       </table>
     </div>
   </div>
 </section>
</template>

<script src="./booking-list.js"></script>
<style src="./booking-list.scss" lang="scss" scoped></style>
