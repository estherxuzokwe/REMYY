const placeholderMealSteps = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Proin posuere leo quam, eget volutpat tortor vulputate vel.",
  "Vivamus faucibus ligula et risus varius ornare.",
  "Integer maximus dignissim nulla non sagittis. Pellentesque faucibus molestie pulvinar.",
  "Nam et fermentum elit, consequat dapibus dui. Praesent at diam tincidunt, porttitor augue sed, lacinia nisi.",
]

// ============= Drag & Drop ===============
function handleDrop(ev) {
  ev.preventDefault()
  const dish = ev.dataTransfer.getData("text/plain")
  console.log("Dropped", dish)
  app.savedDishes.push(dish)
}

function handleDropOver(ev) {
  ev.preventDefault();
}

// ============= Vue Setup ===============
var app = new Vue({
  el: '#vue-app',
  data: {
    // Interactive state
    selectedIngredientIndex: null,
    selectedDish: null,
    ingredientSearch: "",
    savedDishes: [],
    isDropAreaMaximised: false,
    isModalOpen: true,
    restrictions: {
      isVegetarian: false,
      isVegan: false,
      hasNutAllergy: false,
    },

    // Example data for this prototype
    allIngredients: [
      { name: "Potato", imageName: "potato.jpeg" },
      { name: "Sweet Potato", imageName: "sweet-potato.jpeg" },
      { name: "Butternut Squash", imageName: "butternut-squash.jpeg" },
    ],
    dishes: [
      {
        name: "Mashed Potato",
        ingredients: ["Potato", "Sweet Potato", "Salt", "Pepper"],
        method: placeholderMealSteps.splice(0,3)
      },
      {
        name: "Fries",
        ingredients: ["Potato", "Salt", "Pepper"],
        method: placeholderMealSteps.splice(0,2)
      },
      {
        name: "Jacket Potato",
        ingredients: ["Potato", "Salt", "Pepper"],
        method: placeholderMealSteps.splice(0,1)
      },
      {
        name: "Mashed Squash",
        ingredients: ["Butternut Squash", "Butter", "Salt", "Pepper"],
        method: placeholderMealSteps.splice(0,5)
      },
    ],
  },
  mounted: function () {
    // Play theme music on page load
    const audio = new Audio("./resources/audio/theme.mp3")
    audio.loop = true
    audio.play()
  },
  methods: {
    selectIngredient: function (index) { // Show the dishes for this ingredient
      if (this.selectedIngredientIndex !== index) {
        this.selectedIngredientIndex = index
        this.selectedDish = null
      }
    },
    selectDish: function (dish) { // Show the details of this dish
      this.selectedDish = dish
    },
    dragStarted: function (ev) { // Set information for dragged meals
      const name = this.selectedDish.name
      ev.dataTransfer.setData("text/plain", name)
      ev.dataTransfer.dropEffect = "copy"
    },
  },
  computed: {
    ingredients: function() { // The ingredients to display (taking the search term into account)
      if (!this.ingredientSearch) {
        return this.allIngredients
      }
      return this.allIngredients.filter(i => i.name.toLowerCase().includes(this.ingredientSearch.toLowerCase()))
    },
    selectedIngredient: function () { // The ingredient that's been selected
      if (this.selectedIngredientIndex === null) {
        return ""
      }
      return this.ingredients[this.selectedIngredientIndex]
    },
    availableDishes: function () { // The dishes that use the currently selected ingredient
      if (this.selectedIngredientIndex === null) {
        return this.dishes
      }

      return this.dishes
        .filter(d => d.ingredients.includes(this.selectedIngredient.name))
    },
  }
})