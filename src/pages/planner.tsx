"use client"

import { useState } from "react"
import { Calendar, Plus, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const mealPlan = {
  Monday: { breakfast: "Oatmeal", lunch: "Caesar Salad", dinner: "Tomato Pasta" },
  Tuesday: { breakfast: "Smoothie Bowl", lunch: "Buddha Bowl", dinner: "Stir Fry" },
  Wednesday: { breakfast: "Eggs & Toast", lunch: "Leftover Pasta", dinner: "Tacos" },
  Thursday: { breakfast: "", lunch: "", dinner: "" },
  Friday: { breakfast: "", lunch: "", dinner: "" },
  Saturday: { breakfast: "", lunch: "", dinner: "" },
  Sunday: { breakfast: "", lunch: "", dinner: "" },
}

export default function PlannerPage() {
  const [plan, setPlan] = useState(mealPlan)

  const exportShoppingList = () => {
    alert("Shopping list exported!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-3 font-serif text-5xl font-bold text-foreground">Meal Planner</h1>
            <p className="text-lg text-muted-foreground">Organize your week and plan ahead</p>
          </div>
          <Button
            size="lg"
            className="gap-2 bg-gradient-to-r from-indigo-600 to-rose-600 shadow-lg hover:scale-105"
            onClick={exportShoppingList}
          >
            <Download className="h-5 w-5" />
            Export Shopping List
          </Button>
        </div>

        <div className="grid gap-6">
          {days.map((day) => (
            <Card key={day} className="border-2 border-indigo-100 bg-white shadow-sm">
              <CardHeader className="border-b border-indigo-100 bg-indigo-50/50">
                <CardTitle className="flex items-center gap-2 font-serif text-2xl">
                  <Calendar className="h-6 w-6 text-indigo-600" />
                  {day}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {["breakfast", "lunch", "dinner"].map((meal) => (
                    <div key={meal} className="space-y-2">
                      <h3 className="font-semibold capitalize text-muted-foreground">{meal}</h3>
                      {plan[day as keyof typeof plan][meal as keyof (typeof plan)["Monday"]] ? (
                        <Badge className="bg-gradient-to-r from-indigo-600 to-rose-600 px-3 py-1.5 text-sm">
                          {plan[day as keyof typeof plan][meal as keyof (typeof plan)["Monday"]]}
                        </Badge>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 border-indigo-200 hover:border-indigo-400 bg-transparent"
                        >
                          <Plus className="h-3 w-3" />
                          Add {meal}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
