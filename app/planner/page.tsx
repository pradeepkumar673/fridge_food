"use client"

import { useState, useEffect, useRef } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Plus } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const mealTypes = ["Breakfast", "Lunch", "Dinner"]

const mockMealPlan = {
  Monday: {
    Lunch: "Creamy Tomato Basil Pasta",
    Dinner: "Grilled Chicken Caesar Salad",
  },
  Wednesday: {
    Dinner: "Spicy Thai Basil Stir Fry",
  },
  Friday: {
    Breakfast: "Healthy Buddha Bowl",
    Dinner: "Homemade Margherita Pizza",
  },
}

export default function PlannerPage() {
  const [ingredients, setIngredients] = useState<string[]>(["Tomatoes", "Chicken", "Basil"])
  const [selectedMoods, setSelectedMoods] = useState<string[]>(["quick"])
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })

      gsap.fromTo(
        ".day-card",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".planner-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar
          ingredients={ingredients}
          onIngredientsChange={setIngredients}
          selectedMoods={selectedMoods}
          onMoodsChange={setSelectedMoods}
        />
        <main className="flex-1">
          <div className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm lg:hidden">
            <SidebarTrigger />
            <h1 className="font-display text-lg font-semibold">Meal Planner</h1>
          </div>

          <div className="mx-auto max-w-7xl px-6 py-12">
            <div ref={headerRef} className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="font-display mb-3 text-5xl font-bold">Meal Planner</h1>
                <p className="text-xl text-muted-foreground">Plan your week and generate shopping lists</p>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                <Download className="mr-2 h-5 w-5" />
                Export Shopping List
              </Button>
            </div>

            <div className="planner-grid space-y-6">
              {weekDays.map((day) => (
                <Card
                  key={day}
                  className="day-card overflow-hidden border-2 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                    <CardTitle className="font-display text-2xl">{day}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      {mealTypes.map((meal) => {
                        const plannedMeal =
                          mockMealPlan[day as keyof typeof mockMealPlan]?.[meal as keyof typeof mockMealPlan.Monday]

                        return (
                          <div
                            key={meal}
                            className="group rounded-xl border-2 border-dashed p-4 transition-all hover:border-primary hover:bg-primary/5 hover:shadow-md"
                          >
                            <div className="mb-3 flex items-center justify-between">
                              <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                {meal}
                              </span>
                              {!plannedMeal && (
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 transition-all hover:scale-110 hover:bg-primary/20"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            {plannedMeal ? (
                              <Badge
                                variant="secondary"
                                className="w-full justify-center border border-primary/20 py-2 shadow-sm"
                              >
                                {plannedMeal}
                              </Badge>
                            ) : (
                              <p className="text-center text-sm text-muted-foreground">No meal planned</p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
