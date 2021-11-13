<template>
  <div class="container">
    <br /><br />
    <div class="row">
      <div>
        <h2>Add New Product</h2>
        <br />
      </div>
    </div>
   <div class="container">

        <div class="form-group row">
            <div class="col">
                <div class="form-group">
                    <label for="productName">Product Name :</label>
                    <input type="text" v-model="product.productName" class="form-control" id="productName" placeholder="Enter productName" name="productName">
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="productPrice">Product Price:</label>
                    <input type="text" v-model="product.productPrice" class="form-control" id="productPrice" placeholder="Enter productPrice" name="productPrice">
                </div>
            </div>
        </div>
        <div class="form-group row">
            <div class="col">
                <div class="form-group">
                    <label for="productDescription">Product Description:</label>
                    <textarea v-model="product.productDescription" class="form-control" id="productDescription" placeholder="Enter Description" rows="3"></textarea>

                </div>
            </div>
        </div>
        
      <div class="form-group row">
        <div class="col">
          <div class="form-group">
            <label for="productPicture">Upload Image:</label>
            <UploadImage
              id="productPicture"
              name="productPicture"
              ref="productPicture"
            />
          </div>
        </div>
      </div>
      

      <button class="btn btn-primary" v-on:click="SaveProduct()">Save</button
      >&nbsp;
      <button class="btn btn-danger" v-on:click="Cancel()">Cancel</button>
    </div>
    <br /><br />
  </div>
</template>

<script>
import UploadImage from "./UploadImage.vue";
import axios from "axios";
//import moment from "moment";
export default {
  name: "ProductAddNew",
  components: {
    UploadImage,
  },
  data() {
    return {
      accessToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzY4MTUxNDUsImV4cCI6MTYzNjgxODc0NX0.zsu7qK8FAHgnS_EyUm0RkhZS0fxpM7bqbZsntQIq-6U",
      product: {
        productName: "",
        productDescription: "",
        productPrice: 1,
        productPicture : "",
      },
    };
  },
  methods: {
    async SaveProduct() {
      if (confirm("Do you want to save this product?")) {

        let productPicture = await this.$refs.productPicture.getFileName();

        if ((await productPicture) !== "") {
          this.product.productPicture = await productPicture;
          await this.$refs.productPicture.UploadImage();
        }

        await axios.post(this.$apiUrl + "product", this.product, {
          headers: { Authorization: `bearer ${this.accessToken}` },
        });
        await this.$router.push("/products");
      }
    },
    Cancel() {
      if (confirm("Do you want to cancel adding this product?")) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.book-item {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}

label {
  /* Other styling... */
  text-align: right;
  clear: both;
  float: left;
  margin-right: 15px;
}
</style>
