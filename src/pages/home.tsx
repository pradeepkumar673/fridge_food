"use client"

import { useState, useEffect, useRef } from "react"
import { Hero3D } from "../components/hero-3d"
import { RecipeCard, type Recipe } from "../components/recipe-card"
import { RecipeModal } from "../components/recipe-modal"
import { Button } from "../components/ui/button"
import { ArrowDown } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: "Creamy Tomato Basil Pasta",
    image: "/creamy-tomato-pasta.jpg",
    cookTime: 25,
    servings: 4,
    calories: 420,
    matchPercentage: 95,
  },
  {
    id: 2,
    title: "Grilled Chicken Caesar Salad",
    image: "/chicken-caesar-salad.png",
    cookTime: 20,
    servings: 2,
    calories: 350,
    matchPercentage: 88,
  },
  {
    id: 3,
    title: "Spicy Thai Basil Stir Fry",
    image: "/thai-basil-stir-fry.jpg",
    cookTime: 30,
    servings: 3,
    calories: 380,
    matchPercentage: 82,
  },
  {
    id: 4,
    title: "Homemade Margherita Pizza",
    image: "/margherita-pizza.png",
    cookTime: 45,
    servings: 6,
    calories: 520,
    matchPercentage: 78,
  },
  {
    id: 5,
    title: "Healthy Buddha Bowl",
    image: "/vibrant-buddha-bowl.png",
    cookTime: 35,
    servings: 2,
    calories: 310,
    matchPercentage: 91,
  },
  {
    id: 6,
    title: "Classic Beef Tacos",
    image: "/beef-tacos.jpg",
    cookTime: 20,
    servings: 4,
    calories: 450,
    matchPercentage: 75,
  },
]

const mockRecipeDetails = {
  ingredients: [
    { name: "Tomatoes", amount: "4 medium", available: true },
    { name: "Basil", amount: "1 bunch", available: true },
    { name: "Garlic", amount: "3 cloves", available: true },
    { name: "Heavy Cream", amount: "1 cup", available: false },
    { name: "Pasta", amount: "1 lb", available: true },
    { name: "Parmesan", amount: "1/2 cup", available: false },
  ],
  steps: [
    "Bring a large pot of salted water to boil for the pasta.",
    "Meanwhile, heat olive oil in a large skillet over medium heat. Add minced garlic and sauté until fragrant.",
    "Add diced tomatoes and cook until they break down and become saucy, about 10 minutes.",
    "Stir in heavy cream and bring to a gentle simmer.",
    "Cook pasta according to package directions. Reserve 1 cup pasta water before draining.",
    "Add cooked pasta to the sauce with torn basil leaves. Toss to combine, adding pasta water as needed.",
    "Serve immediately with grated Parmesan cheese on top.",
  ],
  nutrition: [
    { label: "Calories", value: "420" },
    { label: "Protein", value: "18g" },
    { label: "Carbs", value: "52g" },
    { label: "Fat", value: "16g" },
    { label: "Fiber", value: "4g" },
    { label: "Sugar", value: "6g" },
  ],
}

export default function HomePage() {
  const [ingredients, setIngredients] = useState<string[]>(["Tomatoes", "Chicken", "Basil"])
  const [selectedMoods, setSelectedMoods] = useState<string[]>(["quick"])
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const recipesHeaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" },
      )

      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.5, ease: "back.out(1.7)" },
      )

      gsap.fromTo(
        recipesHeaderRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: recipesHeaderRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        },
      )

      gsap.fromTo(
        ".recipe-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#recipes",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  const scrollToRecipes = () => {
    const recipesSection = document.getElementById("recipes")
    if (recipesSection) {
      recipesSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-rose-50"
      >
        <Hero3D />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <h1
            ref={titleRef}
            className="mb-6 font-serif text-6xl font-bold leading-[1.1] tracking-tight text-balance md:text-7xl lg:text-8xl"
          >
            What's in your{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-rose-600 to-indigo-600 bg-clip-text text-transparent">
              fridge?
            </span>
          </h1>
          <p ref={subtitleRef} className="mb-10 text-xl leading-relaxed text-muted-foreground md:text-2xl text-pretty">
            Turn everyday ingredients into extraordinary meals.
          </p>
          <div ref={buttonRef}>
            <Button
              size="lg"
              className="gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-rose-600 px-8 py-6 text-lg font-medium shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              onClick={scrollToRecipes}
            >
              Start Cooking
              <ArrowDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section id="recipes" className="px-6 py-20 bg-white">
        <div className="mx-auto max-w-7xl">
          <div ref={recipesHeaderRef} className="mb-12">
            <h2 className="mb-3 font-serif text-5xl font-bold text-foreground">Recipes for You</h2>
            <p className="text-lg text-muted-foreground">Handpicked based on your ingredients and taste</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <RecipeCard recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedRecipe && (
        <RecipeModal
          recipe={{ ...selectedRecipe, ...mockRecipeDetails }}
          isOpen={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          userIngredients={ingredients}
        />
      )}
    </>
  )
}
