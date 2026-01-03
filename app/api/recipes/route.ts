import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const ingredients = searchParams.get("ingredients")
  const diet = searchParams.get("diet")

  // Mock API response - in production, this would call Spoonacular or similar API
  const mockRecipes = [
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
  ]

  return NextResponse.json({ recipes: mockRecipes })
}
