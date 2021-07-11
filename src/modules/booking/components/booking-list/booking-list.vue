<template>
  <section class="booking-list mt-4">
    <div class="row">
      <div class="col-12 col-md-6">
        <input v-model="search" type="text" class="form-control" placeholder="Search by customer name">
      </div>
      <div class="col-7 col-md-4 mt-md-0 mt-2">
        <select class="form-select" v-model="roomSearch">
          <option value="" selected>Filter by room name</option>
          <option value="Sea_view1">Sea_view1</option>
          <option value="Sea_view2">Sea_view2</option>
          <option value="Garden_view1">Garden_view1</option>
          <option value="Garden_view2">Garden_view2</option>
        </select>
      </div>
      <div class="col-5 col-md-2 mt-md-0 mt-2">
        <button @click="create" class="btn btn-primary float-end clearfix create-btn">
          <span>+</span>
          <span>Create</span>
        </button>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="table-responsive content">
          <table v-if="filteredList.length" class="table table-hover bg-white">
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
            <tr v-for="(item, idx) in filteredList" :key="item.id">
              <th scope="row">{{ idx + 1 }}</th>
              <td>{{ item.name }}</td>
              <td>{{ item.room.title }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.duration }}</td>
              <td>{{ item.beds }}</td>
              <td>{{ item.price }}$</td>
              <td>
                <template v-if="canModify(item.date)">
                <span class="mx-2">
                  <i @click="edit(item.id)" class="bi bi-pencil-square pointer fs-4"></i>
                </span>
                  <span class="mx-2">
                  <i @click="remove(item.id)" class="bi bi-x pointer text-danger fs-4"></i>
                </span>
                </template>
              </td>
            </tr>
            </tbody>
          </table>
          <div v-else class="d-flex min-vh-50 w-100 justify-content-center align-items-center">
            <h3>No Data Found</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="./booking-list.js"></script>
<style src="./booking-list.scss" lang="scss" scoped></style>
