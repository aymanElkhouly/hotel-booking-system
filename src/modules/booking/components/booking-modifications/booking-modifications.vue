<template>
  <section class="booking-modifications">
    <h4 class="my-3">{{id ? 'Update Booking': 'Create Booking'}}</h4>
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-12 col-md-6 pe-5 mb-3">
          <label for="name" class="form-label">Customer Name</label>
          <input :class="{'border-danger': v$.booking.name.$error}"
                 class="form-control"
                 v-model="booking.name"
                 type="text"
                 id="name">
          <div v-if="v$.booking.name.$error" class="text-danger">
            {{ v$.booking.name.$errors[0].$message }}
          </div>
        </div>
        <div class="col-12 col-md-6 ps-5 mb-3">
          <label for="name" class="form-label">Customer Phone Number</label>
          <input :class="{'border-danger': v$.booking.phone.$error}"
                 class="form-control"
                 v-model="booking.phone"
                 type="tel" id="phone">
          <div v-if="v$.booking.phone.$error" class="text-danger">
            {{ v$.booking.phone.$errors[0].$message }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 pe-5 mb-3">
          <label for="date" class="form-label">Booking Date</label>
          <input :class="{'border-danger': v$.booking.date.$error}"
                 class="form-control"
                 type="date"
                 :min="todayDate"
                 :value="booking.date"
                 @change="setDate($event)"
                 id="date">
          <div v-if="v$.booking.date.$error" class="text-danger">
            {{ v$.booking.date.$errors[0].$message }}
          </div>
        </div>
        <div class="col-12 col-md-6 ps-5 mb-3">
          <label for="room" class="form-label">Room Name</label>
          <select :class="{'border-danger': v$.booking.room.id.$error}"
                  class="form-select"
                  v-model="booking.room"
                  @change="roomValidation"
                  id="room">
            <option value="" disabled selected>Select Room</option>
            <option v-for="item in rooms" :key="item.id" :value="item">
              {{ item.title }}
            </option>
          </select>
          <div v-if="v$.booking.room.id.$error" class="text-danger">
            {{ v$.booking.room.id.$errors[0].$message }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 pe-5 mb-3">
          <label for="duration" class="form-label">Booking Duration</label>
          <select :class="{'border-danger': v$.booking.duration.$error}"
                  class="form-select"
                  v-model="booking.duration"
                  id="duration">
            <option disabled selected>Select Duration</option>
            <option v-for="item in durations" :value="item.id" :key="item.id">
              {{ item.title }}
            </option>
          </select>
          <div v-if="v$.booking.duration.$error" class="text-danger">
            {{ v$.booking.duration.$errors[0].$message }}
          </div>
        </div>
        <div class="col-12 col-md-6 ps-5 mb-3">
          <label for="beds" class="form-label">Number Of Beds</label>
          <select :class="{'border-danger': v$.booking.beds.$error}"
                  class="form-select"
                  v-model="booking.beds"
                  id="beds" >
            <option selected disabled>Select Beds</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <div v-if="v$.booking.beds.$error" class="text-danger">
            {{ v$.booking.beds.$errors[0].$message }}
          </div>
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
