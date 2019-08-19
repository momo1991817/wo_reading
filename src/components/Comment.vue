<script>
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : { img: false };
export default {
    user
};
</script>