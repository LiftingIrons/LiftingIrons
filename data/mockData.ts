// Mock data for the fitness app

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  joinDate: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number; // 0 to 1
  daysLeft: number;
  category: 'fitness' | 'nutrition' | 'wellness';
}

export interface Workout {
  id: string;
  name: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  exercises: number;
  imageUrl: string;
  category: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  equipment: string[];
  muscles: string[];
  imageUrl: string;
  instructions: string[];
  tips: string[];
  commonMistakes: string[];
  variations: string[];
}

export interface Meal {
  id: string;
  title: string;
  prepTime: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl: string;
  ingredients: Array<{
    name: string;
    amount: string;
    unit: string;
    allergens?: string[];
  }>;
  instructions: Array<{
    number: number;
    instruction: string;
  }>;
  category?: string;
  tags?: string[];
  allergens?: string[];
}

export interface Tip {
  id: string;
  title: string;
  content: string;
  icon: string;
}

// Sample user data
export const user: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  profileImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
  joinDate: '2024-01-15',
};

// Sample goals
export const goals: Goal[] = [
  {
    id: '1',
    title: 'Lose 10 pounds',
    description: 'Reach target weight through consistent exercise and nutrition',
    progress: 0.7,
    daysLeft: 45,
    category: 'fitness',
  },
  {
    id: '2',
    title: 'Run 5K without stopping',
    description: 'Build cardiovascular endurance for continuous 5K run',
    progress: 0.4,
    daysLeft: 60,
    category: 'fitness',
  },
  {
    id: '3',
    title: 'Eat 5 servings of vegetables daily',
    description: 'Improve nutrition by increasing vegetable intake',
    progress: 0.8,
    daysLeft: 30,
    category: 'nutrition',
  },
];

// Sample workouts
export const workouts: Workout[] = [
  {
    id: '1',
    name: 'Morning HIIT Blast',
    duration: '20 min',
    level: 'intermediate',
    exercises: 8,
    imageUrl: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
    category: 'cardio',
  },
  {
    id: '2',
    name: 'Upper Body Strength',
    duration: '45 min',
    level: 'advanced',
    exercises: 12,
    imageUrl: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg',
    category: 'strength',
  },
  {
    id: '3',
    name: 'Yoga Flow',
    duration: '30 min',
    level: 'beginner',
    exercises: 15,
    imageUrl: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg',
    category: 'flexibility',
  },
];

// Low-calorie breakfast meals
const lowCalorieBreakfastMeals: Meal[] = [
  {
    id: 'kimchi-scrambled-eggs',
    title: 'Kimchi Scrambled Eggs',
    prepTime: '10 min',
    servings: 1,
    calories: 233,
    protein: 17,
    carbs: 15,
    fat: 11,
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761249765/Firefly_a_Single_meal_of_kimchi_scrambled_eggs_on_a_table_971316_nhuyry.jpg',
    category: 'breakfast',
    tags: ['breakfast', 'low-calorie', 'high-protein'],
    allergens: ['eggs', 'milk', 'gluten'],
    ingredients: [
      { name: 'eggs', amount: '2', unit: 'medium', allergens: ['eggs'] },
      { name: 'milk', amount: '1', unit: 'tbsp', allergens: ['milk'] },
      { name: 'kimchi', amount: '40', unit: 'g' },
      { name: 'wholemeal bread', amount: '1', unit: 'slice', allergens: ['gluten'] },
      { name: 'spring onion', amount: '1', unit: 'whole' },
      { name: 'togarashi', amount: '1', unit: 'pinch' }
    ],
    instructions: [
      { number: 1, instruction: 'Beat eggs and milk with a pinch of salt.' },
      { number: 2, instruction: 'Pour into a non-stick pan over low heat. Leave untouched for 30 seconds, then swirl the pan gently.' },
      { number: 3, instruction: 'After 2 mins, fold in the kimchi to scramble the eggs.' },
      { number: 4, instruction: 'Serve on toast, topped with spring onion and togarashi if you like.' }
    ]
  },
  {
    id: 'healthy-pepper-ham-omelette',
    title: 'Healthy Pepper, Tomato & Ham Omelette',
    prepTime: '15 min',
    servings: 1,
    calories: 206,
    protein: 21,
    carbs: 5,
    fat: 12,
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761249891/Firefly_a_Single_meal_of_kimchi_scrambled_eggs_on_a_table_740906_netryk.jpg',
    category: 'breakfast',
    tags: ['breakfast', 'low-calorie', 'high-protein'],
    allergens: ['eggs', 'dairy'],
    ingredients: [
      { name: 'whole eggs', amount: '2', unit: 'whole', allergens: ['eggs'] },
      { name: 'egg whites', amount: '3', unit: 'whole', allergens: ['eggs'] },
      { name: 'olive oil', amount: '1', unit: 'tsp' },
      { name: 'red pepper', amount: '1', unit: 'whole' },
      { name: 'spring onions', amount: '2', unit: 'whole' },
      { name: 'extra-lean ham', amount: '2-3', unit: 'slices' },
      { name: 'reduced-fat mature cheddar', amount: '25', unit: 'g', allergens: ['dairy'] }
    ],
    instructions: [
      { number: 1, instruction: 'Mix eggs and whites with seasoning.' },
      { number: 2, instruction: 'Heat oil in pan and cook red pepper for 3–4 mins, add white parts of spring onions and cook 1 min more.' },
      { number: 3, instruction: 'Pour in egg mix and cook until almost set.' },
      { number: 4, instruction: 'Sprinkle ham and cheese, cook until just set or grill briefly.' },
      { number: 5, instruction: 'Serve topped with green onion parts and optional tomato/toast.' }
    ]
  },
  {
    id: 'spinach-pepper-frittata',
    title: 'Spinach & Pepper Frittata',
    prepTime: '20 min',
    servings: 4,
    calories: 198,
    protein: 22,
    carbs: 5,
    fat: 10,
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761250080/Firefly_a_Single_meal_of_kimchi_scrambled_eggs_on_a_table_60505_zohboq.jpg',
    category: 'breakfast',
    tags: ['breakfast', 'low-calorie', 'high-protein', 'vegetarian'],
    allergens: ['eggs', 'dairy'],
    ingredients: [
      { name: 'large eggs', amount: '5', unit: 'whole', allergens: ['eggs'] },
      { name: 'low-fat natural cottage cheese', amount: '300', unit: 'g', allergens: ['dairy'] },
      { name: 'garlic clove', amount: '1', unit: 'whole' },
      { name: 'finely grated Parmesan', amount: '15', unit: 'g', allergens: ['dairy'] },
      { name: 'frozen leaf spinach', amount: '225', unit: 'g' },
      { name: 'roasted red peppers', amount: '2', unit: 'whole' },
      { name: 'cherry tomatoes', amount: '100', unit: 'g' }
    ],
    instructions: [
      { number: 1, instruction: 'Preheat oven to 190°C/170°C fan/gas 5.' },
      { number: 2, instruction: 'Beat eggs with cottage cheese, garlic, half the Parmesan, spinach, peppers, nutmeg, and seasoning.' },
      { number: 3, instruction: 'Pour into lined tin, top with tomatoes and remaining Parmesan.' },
      { number: 4, instruction: 'Bake 40 mins until set. Cut into wedges.' }
    ]
  },
  {
    id: 'melting-tomato-basil-omelette',
    title: 'Melting Tomato & Basil Omelette',
    prepTime: '10 min',
    servings: 1,
    calories: 360,
    protein: 20,
    carbs: 3,
    fat: 30,
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761250186/Firefly_a_Single_meal_of_Melting_Tomato_Basil_Omelette_on_a_table_60505_kr08li.jpg',
    category: 'breakfast',
    tags: ['breakfast', 'low-calorie', 'high-protein', 'vegetarian'],
    allergens: ['eggs', 'dairy'],
    ingredients: [
      { name: 'ripe tomato', amount: '1', unit: 'whole' },
      { name: 'grated vegetarian cheddar', amount: '1', unit: 'tbsp', allergens: ['dairy'] },
      { name: 'basil leaves', amount: '3', unit: 'whole' },
      { name: 'spring onion', amount: '1', unit: 'whole' },
      { name: 'olive oil', amount: '1', unit: 'tbsp' },
      { name: 'eggs', amount: '2', unit: 'whole', allergens: ['eggs'] }
    ],
    instructions: [
      { number: 1, instruction: 'Chop tomato and mix in bowl with cheese, basil, spring onion, half the oil, salt and pepper.' },
      { number: 2, instruction: 'Heat remaining oil in pan, add eggs, cook until nearly done.' }
    ]
  }
];

// Bulk meals for muscle gain
const additionalBulkMeals: Meal[] = [
  {
    id: 'bulk-protein-pancakes',
    title: 'High-Protein Pancakes',
    prepTime: '15 min',
    servings: 2,
    calories: 650,
    protein: 45,
    carbs: 55,
    fat: 22,
    category: 'breakfast',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761250263/Firefly_a_Single_meal_of_High-Protein_Pancakes_on_a_table_740906_ozkseq.jpg',
    ingredients: [
      { name: 'Protein powder', amount: '2', unit: 'scoops' },
      { name: 'Oats', amount: '1', unit: 'cup' },
      { name: 'Banana', amount: '2', unit: 'large' },
      { name: 'Eggs', amount: '3', unit: 'whole' },
      { name: 'Peanut butter', amount: '2', unit: 'tbsp' },
      { name: 'Milk', amount: '1/2', unit: 'cup' }
    ],
    instructions: [
      { number: 1, instruction: 'Blend all ingredients until smooth' },
      { number: 2, instruction: 'Heat pan over medium heat' },
      { number: 3, instruction: 'Pour batter to form pancakes' },
      { number: 4, instruction: 'Cook 2-3 minutes per side until golden' },
      { number: 5, instruction: 'Serve with additional peanut butter' }
    ]
  },
  {
    id: 'bulk-steak-rice',
    title: 'Steak and Rice Power Bowl',
    prepTime: '25 min',
    servings: 1,
    calories: 780,
    protein: 52,
    carbs: 68,
    fat: 28,
    category: 'dinner',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761251790/Firefly_a_Single_meal_of_Steak_and_Rice_Power_Bowl_on_a_table_966309_zxdrtu.jpg',
    ingredients: [
      { name: 'Sirloin steak', amount: '8', unit: 'oz' },
      { name: 'Brown rice', amount: '1.5', unit: 'cups cooked' },
      { name: 'Broccoli', amount: '1', unit: 'cup' },
      { name: 'Olive oil', amount: '1', unit: 'tbsp' },
      { name: 'Sweet potato', amount: '1', unit: 'medium' },
      { name: 'Butter', amount: '1', unit: 'tbsp' }
    ],
    instructions: [
      { number: 1, instruction: 'Season and grill steak to desired doneness' },
      { number: 2, instruction: 'Roast sweet potato at 400°F for 25 minutes' },
      { number: 3, instruction: 'Steam broccoli until tender' },
      { number: 4, instruction: 'Serve steak over rice with vegetables' },
      { number: 5, instruction: 'Drizzle with olive oil and add butter to sweet potato' }
    ]
  },
  {
    id: 'bulk-pasta-meatballs',
    title: 'Protein-Packed Pasta & Meatballs',
    prepTime: '30 min',
    servings: 2,
    calories: 720,
    protein: 48,
    carbs: 72,
    fat: 24,
    category: 'dinner',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761252066/Firefly_a_Single_meal_of_Protein-Packed_Pasta_Meatballs_on_a_table_569989_mcyn7h.jpg',
    ingredients: [
      { name: 'Whole wheat pasta', amount: '3', unit: 'cups cooked' },
      { name: 'Ground turkey', amount: '8', unit: 'oz' },
      { name: 'Marinara sauce', amount: '1', unit: 'cup' },
      { name: 'Mozzarella cheese', amount: '1/2', unit: 'cup' },
      { name: 'Olive oil', amount: '1', unit: 'tbsp' },
      { name: 'Parmesan cheese', amount: '2', unit: 'tbsp' }
    ],
    instructions: [
      { number: 1, instruction: 'Form turkey into meatballs and bake at 375°F for 20 minutes' },
      { number: 2, instruction: 'Cook pasta according to package directions' },
      { number: 3, instruction: 'Heat marinara sauce and add meatballs' },
      { number: 4, instruction: 'Combine pasta with sauce and meatballs' },
      { number: 5, instruction: 'Top with mozzarella and parmesan cheese' }
    ]
  },
  {
    id: 'bulk-smoothie-bowl',
    title: 'Mass Gainer Smoothie Bowl',
    prepTime: '10 min',
    servings: 1,
    calories: 580,
    protein: 38,
    carbs: 62,
    fat: 18,
    category: 'breakfast',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761252533/Firefly_a_Single_meal_of_Mass_Gainer_white_Smoothie_Bowl_on_a_table_205660_tj7r3t.jpg',
    ingredients: [
      { name: 'Protein powder', amount: '2', unit: 'scoops' },
      { name: 'Banana', amount: '2', unit: 'large' },
      { name: 'Oats', amount: '1/2', unit: 'cup' },
      { name: 'Almond butter', amount: '2', unit: 'tbsp' },
      { name: 'Milk', amount: '1', unit: 'cup' },
      { name: 'Granola', amount: '1/4', unit: 'cup' },
      { name: 'Mixed berries', amount: '1/2', unit: 'cup' }
    ],
    instructions: [
      { number: 1, instruction: 'Blend protein powder, banana, oats, almond butter and milk' },
      { number: 2, instruction: 'Pour into bowl' },
      { number: 3, instruction: 'Top with granola and berries' },
      { number: 4, instruction: 'Add extra almond butter if desired' }
    ]
  },
  {
    id: 'bulk-chicken-rice',
    title: 'Chicken & Rice Power Meal',
    prepTime: '20 min',
    servings: 1,
    calories: 690,
    protein: 46,
    carbs: 78,
    fat: 16,
    category: 'lunch',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761252727/Firefly_a_Single_meal_of_Chicken_Rice_Power_Meal_on_a_table_316771_yjqhye.jpg',
    ingredients: [
      { name: 'Chicken breast', amount: '8', unit: 'oz' },
      { name: 'Jasmine rice', amount: '1.5', unit: 'cups cooked' },
      { name: 'Black beans', amount: '1/2', unit: 'cup' },
      { name: 'Avocado', amount: '1/2', unit: 'medium' },
      { name: 'Olive oil', amount: '1', unit: 'tbsp' },
      { name: 'Corn', amount: '1/2', unit: 'cup' }
    ],
    instructions: [
      { number: 1, instruction: 'Season and grill chicken breast' },
      { number: 2, instruction: 'Cook rice according to package directions' },
      { number: 3, instruction: 'Warm black beans and corn' },
      { number: 4, instruction: 'Slice chicken and arrange over rice' },
      { number: 5, instruction: 'Top with beans, corn, and avocado' }
    ]
  },
{
  id: 'steak-sweet-potato-plate',
  title: 'Steak & Sweet Potato Plate',
  prepTime: '25 min',
  servings: 1,
  calories: 720,
  protein: 52,
  carbs: 60,
  fat: 28,
  category: 'lunch',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761252948/Firefly_a_Single_meal_of_Steak_green_beans_Sweet_Potato_Plate_on_a_table_316771_lhnttq.jpg',
  ingredients: [
    { name: 'Sirloin steak', amount: '8', unit: 'oz' },
    { name: 'Sweet potato', amount: '1', unit: 'medium' },
    { name: 'Olive oil', amount: '1', unit: 'tbsp' },
    { name: 'Green beans', amount: '1', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Season and grill steak to desired doneness' },
    { number: 2, instruction: 'Bake or roast sweet potato until tender' },
    { number: 3, instruction: 'Steam green beans until crisp-tender' },
    { number: 4, instruction: 'Plate steak with sweet potato and beans' }
  ]
},
{
  id: 'salmon-quinoa-power-bowl',
  title: 'Salmon & Quinoa Power Bowl',
  prepTime: '20 min',
  servings: 1,
  calories: 650,
  protein: 42,
  carbs: 55,
  fat: 24,
  category: 'lunch',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761253066/Firefly_a_Single_meal_of_Salmon_Quinoa_Power_Bowl_on_a_table_735722_jsmzsn.jpg',
  ingredients: [
    { name: 'Salmon fillet', amount: '6', unit: 'oz' },
    { name: 'Quinoa', amount: '1', unit: 'cup cooked' },
    { name: 'Spinach', amount: '1', unit: 'cup' },
    { name: 'Cherry tomatoes', amount: '1/2', unit: 'cup' },
    { name: 'Olive oil', amount: '1', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Season and bake salmon until flaky' },
    { number: 2, instruction: 'Cook quinoa according to package directions' },
    { number: 3, instruction: 'Sauté spinach in olive oil' },
    { number: 4, instruction: 'Assemble bowl with quinoa, salmon, spinach, and tomatoes' }
  ]
},
{
  id: 'turkey-meatball-pasta',
  title: 'Turkey Meatball Pasta',
  prepTime: '30 min',
  servings: 1,
  calories: 700,
  protein: 48,
  carbs: 80,
  fat: 18,
  category: 'dinner',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
  ingredients: [
    { name: 'Ground turkey', amount: '6', unit: 'oz' },
    { name: 'Pasta', amount: '2', unit: 'cups cooked' },
    { name: 'Tomato sauce', amount: '1', unit: 'cup' },
    { name: 'Parmesan cheese', amount: '2', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Form ground turkey into meatballs and bake' },
    { number: 2, instruction: 'Cook pasta until al dente' },
    { number: 3, instruction: 'Simmer meatballs in tomato sauce' },
    { number: 4, instruction: 'Serve pasta topped with meatballs and sauce' },
    { number: 5, instruction: 'Sprinkle with Parmesan' }
  ]
},
{
  id: 'beef-burrito-bowl',
  title: 'Beef Burrito Bowl',
  prepTime: '25 min',
  servings: 1,
  calories: 760,
  protein: 46,
  carbs: 85,
  fat: 22,
  category: 'lunch',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg',
  ingredients: [
    { name: 'Ground beef', amount: '6', unit: 'oz' },
    { name: 'Brown rice', amount: '1.5', unit: 'cups cooked' },
    { name: 'Black beans', amount: '1/2', unit: 'cup' },
    { name: 'Corn', amount: '1/2', unit: 'cup' },
    { name: 'Salsa', amount: '1/4', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Cook ground beef with seasonings' },
    { number: 2, instruction: 'Cook rice according to package directions' },
    { number: 3, instruction: 'Warm beans and corn' },
    { number: 4, instruction: 'Assemble bowl with rice, beef, beans, and corn' },
    { number: 5, instruction: 'Top with salsa' }
  ]
},
{
  id: 'chicken-alfredo-pasta',
  title: 'Chicken Alfredo Pasta',
  prepTime: '30 min',
  servings: 1,
  calories: 820,
  protein: 50,
  carbs: 85,
  fat: 28,
  category: 'dinner',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
  ingredients: [
    { name: 'Chicken breast', amount: '6', unit: 'oz' },
    { name: 'Pasta', amount: '2', unit: 'cups cooked' },
    { name: 'Alfredo sauce', amount: '1', unit: 'cup' },
    { name: 'Parmesan cheese', amount: '2', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Cook pasta until al dente' },
    { number: 2, instruction: 'Grill or pan-sear chicken breast' },
    { number: 3, instruction: 'Heat Alfredo sauce in a saucepan' },
    { number: 4, instruction: 'Combine pasta, sauce, and chicken' },
    { number: 5, instruction: 'Top with Parmesan' }
  ]
},
{
  id: 'pulled-pork-wraps',
  title: 'Pulled Pork Wraps',
  prepTime: '20 min',
  servings: 1,
  calories: 740,
  protein: 42,
  carbs: 70,
  fat: 32,
  category: 'lunch',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg',
  ingredients: [
    { name: 'Pulled pork', amount: '6', unit: 'oz' },
    { name: 'Whole wheat tortillas', amount: '2', unit: 'medium' },
    { name: 'Coleslaw mix', amount: '1', unit: 'cup' },
    { name: 'BBQ sauce', amount: '2', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Warm tortillas' },
    { number: 2, instruction: 'Mix pulled pork with BBQ sauce' },
    { number: 3, instruction: 'Fill tortillas with pork and coleslaw' },
    { number: 4, instruction: 'Wrap tightly and serve' }
  ]
},
{
  id: 'egg-fried-rice-chicken-thighs',
  title: 'Egg Fried Rice with Chicken Thighs',
  prepTime: '25 min',
  servings: 1,
  calories: 780,
  protein: 44,
  carbs: 85,
  fat: 28,
  category: 'dinner',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761594113/Firefly_A_meal_of_Egg_Fried_Rice_with_Chicken_Thighs_on_a_table_499932_eaivkz.jpg',
  ingredients: [
    { name: 'Chicken thighs', amount: '6', unit: 'oz' },
    { name: 'Rice', amount: '2', unit: 'cups cooked' },
    { name: 'Eggs', amount: '2', unit: 'large' },
    { name: 'Peas', amount: '1/2', unit: 'cup' },
    { name: 'Soy sauce', amount: '2', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Cook and dice chicken thighs' },
    { number: 2, instruction: 'Scramble eggs in a wok or skillet' },
    { number: 3, instruction: 'Add rice, peas, chicken, and soy sauce' },
    { number: 4, instruction: 'Stir-fry until heated through' }
  ]
},
{
  id: 'grilled-lamb-couscous-plate',
  title: 'Grilled Lamb & Couscous Plate',
  prepTime: '30 min',
  servings: 1,
  calories: 750,
  protein: 50,
  carbs: 65,
  fat: 28,
  category: 'dinner',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761594238/Firefly_A_meal_of_Grilled_Lamb_Couscous_Plate_on_a_table_93332_i1zpbe.jpg',
  ingredients: [
    { name: 'Lamb chops', amount: '7', unit: 'oz' },
    { name: 'Couscous', amount: '1.5', unit: 'cups cooked' },
    { name: 'Zucchini', amount: '1', unit: 'cup diced' },
    { name: 'Olive oil', amount: '1', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Grill lamb chops until desired doneness' },
    { number: 2, instruction: 'Cook couscous according to package directions' },
    { number: 3, instruction: 'Sauté zucchini in olive oil' },
    { number: 4, instruction: 'Plate lamb with couscous and zucchini' }
  ]
},
{
  id: 'salmon-poke-bowl',
  title: 'Salmon Poke Bowl',
  prepTime: '20 min',
  servings: 1,
  calories: 670,
  protein: 40,
  carbs: 72,
  fat: 22,
  category: 'lunch',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761594408/Firefly_A_meal_of_Salmon_Poke_Bowl_on_a_table_583108_nofmtc.jpg',
  ingredients: [
    { name: 'Raw salmon (sushi-grade)', amount: '6', unit: 'oz' },
    { name: 'Sushi rice', amount: '1.5', unit: 'cups cooked' },
    { name: 'Edamame', amount: '1/2', unit: 'cup' },
    { name: 'Cucumber', amount: '1/2', unit: 'cup diced' },
    { name: 'Soy sauce', amount: '1', unit: 'tbsp' },
    { name: 'Sesame oil', amount: '1', unit: 'tsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Cook sushi rice and let cool slightly' },
    { number: 2, instruction: 'Dice raw salmon into cubes' },
    { number: 3, instruction: 'Arrange rice in a bowl, then top with salmon, edamame, and cucumber' },
    { number: 4, instruction: 'Drizzle with soy sauce and sesame oil' }
  ]
},
  {
    id: 'bulk-salmon-quinoa',
    title: 'Salmon Quinoa Power Bowl',
    prepTime: '25 min',
    servings: 1,
    calories: 620,
    protein: 42,
    carbs: 48,
    fat: 26,
    category: 'dinner',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761594556/Firefly_A_meal_of_Salmon_Quinoa_Power_Bowl_with_sweet_potatos_on_a_table_437446_gibcm1.jpg',
    ingredients: [
      { name: 'Salmon fillet', amount: '7', unit: 'oz' },
      { name: 'Quinoa', amount: '1', unit: 'cup cooked' },
      { name: 'Sweet potato', amount: '1', unit: 'medium roasted' },
      { name: 'Spinach', amount: '2', unit: 'cups' },
      { name: 'Olive oil', amount: '1', unit: 'tbsp' },
      { name: 'Almonds', amount: '1', unit: 'oz' }
    ],
    instructions: [
      { number: 1, instruction: 'Bake salmon at 400°F for 15 minutes' },
      { number: 2, instruction: 'Cook quinoa according to package directions' },
      { number: 3, instruction: 'Roast sweet potato until tender' },
      { number: 4, instruction: 'Sauté spinach with olive oil' },
      { number: 5, instruction: 'Combine all ingredients and top with almonds' }
    ]
  },
{
  id: 'grilled-chicken-brown-rice-veggies',
  title: 'Grilled Chicken with Brown Rice and Roasted Veggies',
  prepTime: '30 min',
  servings: 1,
  calories: 720,
  protein: 50,
  carbs: 75,
  fat: 20,
  category: 'dinner',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761594657/Firefly_A_meal_of_Grilled_Chicken_with_Brown_Rice_and_Roasted_Veggies_on_a_table_391363_hhacrg.jpg',
  ingredients: [
    { name: 'Chicken breast', amount: '7', unit: 'oz' },
    { name: 'Brown rice', amount: '1.5', unit: 'cups cooked' },
    { name: 'Mixed vegetables', amount: '1.5', unit: 'cups' },
    { name: 'Olive oil', amount: '1', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Grill chicken breast until fully cooked' },
    { number: 2, instruction: 'Cook brown rice according to package directions' },
    { number: 3, instruction: 'Roast mixed vegetables with olive oil' },
    { number: 4, instruction: 'Serve chicken, rice, and veggies together' }
  ]
},
{
  id: 'baked-salmon-sweet-potato-asparagus',
  title: 'Baked Salmon with Sweet Potato and Asparagus',
  prepTime: '25 min',
  servings: 1,
  calories: 690,
  protein: 44,
  carbs: 58,
  fat: 26,
  category: 'dinner',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761594768/Firefly_A_meal_of_Baked_Salmon_with_Mashed_Sweet_Potato_and_Asparagus_on_a_table_520090_fhmvww.jpg',
  ingredients: [
    { name: 'Salmon fillet', amount: '6', unit: 'oz' },
    { name: 'Sweet potato', amount: '1', unit: 'medium' },
    { name: 'Asparagus', amount: '1', unit: 'cup' },
    { name: 'Olive oil', amount: '1', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Bake salmon until flaky' },
    { number: 2, instruction: 'Roast sweet potato until tender' },
    { number: 3, instruction: 'Roast asparagus with olive oil' },
    { number: 4, instruction: 'Plate salmon, potato, and asparagus together' }
  ]
},
{
  id: 'lean-beef-chili-rice',
  title: 'Lean Ground Beef Chili with Kidney Beans and Rice',
  prepTime: '35 min',
  servings: 1,
  calories: 780,
  protein: 48,
  carbs: 82,
  fat: 24,
  category: 'dinner',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761594850/Firefly_A_meal_of_Lean_Ground_Beef_Chili_with_Kidney_Beans_and_Rice_on_a_table_520090_jrmdj8.jpg',
  ingredients: [
    { name: 'Lean ground beef', amount: '6', unit: 'oz' },
    { name: 'Kidney beans', amount: '1/2', unit: 'cup' },
    { name: 'Tomato sauce', amount: '1', unit: 'cup' },
    { name: 'Rice', amount: '1.5', unit: 'cups cooked' }
  ],
  instructions: [
    { number: 1, instruction: 'Cook ground beef in a pot' },
    { number: 2, instruction: 'Add tomato sauce and beans, simmer to thicken' },
    { number: 3, instruction: 'Cook rice according to package directions' },
    { number: 4, instruction: 'Serve chili over rice' }
  ]
},
{
  id: 'teriyaki-chicken-quinoa-broccoli',
  title: 'Teriyaki Chicken with Quinoa and Broccoli',
  prepTime: '25 min',
  servings: 1,
  calories: 710,
  protein: 46,
  carbs: 70,
  fat: 20,
  category: 'dinner',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761594937/Firefly_A_meal_of_Teriyaki_Chicken_with_Quinoa_and_Broccoli_on_a_table_191989_wp42o2.jpg',
  ingredients: [
    { name: 'Chicken breast', amount: '6', unit: 'oz' },
    { name: 'Quinoa', amount: '1', unit: 'cup cooked' },
    { name: 'Broccoli florets', amount: '1', unit: 'cup' },
    { name: 'Teriyaki sauce', amount: '3', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Cook chicken in teriyaki sauce until glazed' },
    { number: 2, instruction: 'Cook quinoa according to package directions' },
    { number: 3, instruction: 'Steam broccoli until tender' },
    { number: 4, instruction: 'Assemble quinoa, chicken, and broccoli in a bowl' }
  ]
},
{
  id: 'shrimp-stirfry-jasmine-mixed-veggies',
  title: 'Shrimp Stir-Fry with Jasmine Rice and Mixed Veggies',
  prepTime: '20 min',
  servings: 1,
  calories: 680,
  protein: 42,
  carbs: 78,
  fat: 18,
  category: 'dinner',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761595019/Firefly_A_meal_of_Shrimp_Stir-Fry_with_Jasmine_Rice_and_Mixed_Veggies_on_a_table_520090_pjgbvp.jpg',
  ingredients: [
    { name: 'Shrimp', amount: '7', unit: 'oz' },
    { name: 'Jasmine rice', amount: '1.5', unit: 'cups cooked' },
    { name: 'Mixed vegetables', amount: '1.5', unit: 'cups' },
    { name: 'Soy sauce', amount: '2', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Cook shrimp in a hot pan until pink' },
    { number: 2, instruction: 'Stir-fry mixed vegetables with soy sauce' },
    { number: 3, instruction: 'Cook jasmine rice' },
    { number: 4, instruction: 'Serve stir-fry over rice' }
  ]
},
{
  id: 'turkey-spinach-stuffed-peppers',
  title: 'Turkey and Spinach Stuffed Peppers with Whole Grain Bread',
  prepTime: '35 min',
  servings: 1,
  calories: 730,
  protein: 48,
  carbs: 74,
  fat: 22,
  category: 'dinner',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761595144/Firefly_A_meal_of_Turkey_and_Spinach_Stuffed_Peppers_with_Whole_Grain_Bread_on_a_table_520090_rbko5g.jpg',
  ingredients: [
    { name: 'Ground turkey', amount: '6', unit: 'oz' },
    { name: 'Spinach', amount: '1', unit: 'cup chopped' },
    { name: 'Bell peppers', amount: '2', unit: 'large' },
    { name: 'Whole grain bread', amount: '2', unit: 'slices' }
  ],
  instructions: [
    { number: 1, instruction: 'Cook ground turkey with spinach' },
    { number: 2, instruction: 'Stuff mixture into halved peppers' },
    { number: 3, instruction: 'Bake peppers until tender' },
    { number: 4, instruction: 'Serve with whole grain bread' }
  ]
},
{
  id: 'grilled-steak-mashed-potatoes-greenbeans',
  title: 'Grilled Steak with Mashed Potatoes and Green Beans',
  prepTime: '30 min',
  servings: 1,
  calories: 800,
  protein: 54,
  carbs: 70,
  fat: 30,
  category: 'dinner',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761595283/Firefly_A_meal_of_Grilled_Steak_with_Mashed_Potatoes_and_Green_Beans_on_a_table_191989_1_v41oqw.jpg',
  ingredients: [
    { name: 'Steak', amount: '8', unit: 'oz' },
    { name: 'Potatoes', amount: '1.5', unit: 'cups mashed' },
    { name: 'Green beans', amount: '1', unit: 'cup' },
    { name: 'Butter', amount: '1', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Grill steak to desired doneness' },
    { number: 2, instruction: 'Boil and mash potatoes with butter' },
    { number: 3, instruction: 'Steam green beans' },
    { number: 4, instruction: 'Plate steak, potatoes, and beans together' }
  ]
},
{
  id: 'baked-cod-couscous-brussels',
  title: 'Baked Cod with Couscous and Roasted Brussels Sprouts',
  prepTime: '25 min',
  servings: 1,
  calories: 670,
  protein: 44,
  carbs: 68,
  fat: 20,
  category: 'dinner',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761595569/Firefly_A_meal_of_Baked_Cod_with_Couscous_and_Roasted_Brussels_Sprouts_on_a_table_520090_tspwok.jpg',
  ingredients: [
    { name: 'Cod fillet', amount: '6', unit: 'oz' },
    { name: 'Couscous', amount: '1.5', unit: 'cups cooked' },
    { name: 'Brussels sprouts', amount: '1', unit: 'cup halved' },
    { name: 'Olive oil', amount: '1', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Bake cod until flaky' },
    { number: 2, instruction: 'Cook couscous according to package directions' },
    { number: 3, instruction: 'Roast Brussels sprouts with olive oil' },
    { number: 4, instruction: 'Serve cod with couscous and sprouts' }
  ]
},
{
  id: 'chicken-lentil-curry-basmati',
  title: 'Chicken and Lentil Curry with Basmati Rice',
  prepTime: '35 min',
  servings: 1,
  calories: 760,
  protein: 48,
  carbs: 88,
  fat: 20,
  category: 'dinner',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761595652/Firefly_A_meal_of_Chicken_and_Lentil_Curry_with_Basmati_Rice_on_a_table_191989_r9rlfo.jpg',
  ingredients: [
    { name: 'Chicken breast', amount: '6', unit: 'oz' },
    { name: 'Lentils', amount: '1', unit: 'cup cooked' },
    { name: 'Curry sauce', amount: '1', unit: 'cup' },
    { name: 'Basmati rice', amount: '1.5', unit: 'cups cooked' }
  ],
  instructions: [
    { number: 1, instruction: 'Cook chicken cubes in curry sauce' },
    { number: 2, instruction: 'Simmer lentils until tender, then add to curry' },
    { number: 3, instruction: 'Cook basmati rice according to package directions' },
    { number: 4, instruction: 'Serve curry over rice' }
  ]
},
{
  id: 'tuna-steak-root-vegetables',
  title: 'Tuna Steak with Roasted Root Vegetables and Olive Oil Drizzle',
  prepTime: '25 min',
  servings: 1,
  calories: 690,
  protein: 50,
  carbs: 60,
  fat: 24,
  category: 'dinner',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761595729/Firefly_A_meal_of_Tuna_Steak_with_Roasted_Root_Vegetables_and_Olive_Oil_Drizzle_on_a_table_520090_p042sz.jpg',
  ingredients: [
    { name: 'Tuna steak', amount: '7', unit: 'oz' },
    { name: 'Root vegetables (carrot, parsnip, beet)', amount: '1.5', unit: 'cups' },
    { name: 'Olive oil', amount: '1', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Sear tuna steak to medium-rare or desired doneness' },
    { number: 2, instruction: 'Roast root vegetables with olive oil until tender' },
    { number: 3, instruction: 'Drizzle tuna and vegetables with olive oil before serving' }
  ]
},
{
  id: 'greek-yogurt-granola-honey',
  title: 'Greek Yogurt with Granola and Honey',
  prepTime: '5 min',
  servings: 1,
  calories: 280,
  protein: 18,
  carbs: 32,
  fat: 8,
  category: 'snack',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761595796/Firefly_A_meal_of_Greek_Yogurt_with_Granola_and_Honey_on_a_table_581380_xzjqjd.jpg',
  ingredients: [
    { name: 'Greek yogurt', amount: '1', unit: 'cup' },
    { name: 'Granola', amount: '1/4', unit: 'cup' },
    { name: 'Honey', amount: '1', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Spoon yogurt into a bowl' },
    { number: 2, instruction: 'Top with granola and drizzle with honey' }
  ]
},
{
  id: 'rice-cakes-peanut-banana',
  title: 'Rice Cakes with Peanut Butter and Banana',
  prepTime: '5 min',
  servings: 1,
  calories: 310,
  protein: 10,
  carbs: 45,
  fat: 12,
  category: 'snack',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761595876/Firefly_A_meal_of_Rice_Cakes_with_Peanut_Butter_and_Banana_on_a_table_520090_qxnr9b.jpg',
  ingredients: [
    { name: 'Rice cakes', amount: '2', unit: 'pieces' },
    { name: 'Peanut butter', amount: '2', unit: 'tbsp' },
    { name: 'Banana', amount: '1/2', unit: 'medium, sliced' }
  ],
  instructions: [
    { number: 1, instruction: 'Spread peanut butter on rice cakes' },
    { number: 2, instruction: 'Top with sliced banana' }
  ]
},
{
  id: 'cottage-cheese-fruit',
  title: 'Cottage Cheese with Pineapple or Berries',
  prepTime: '5 min',
  servings: 1,
  calories: 250,
  protein: 20,
  carbs: 20,
  fat: 8,
  category: 'snack',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761597011/Firefly_A_meal_of_Cottage_Cheese_with_Pineapple_or_Berries_on_a_table_191989_ktdbyj.jpg',
  ingredients: [
    { name: 'Cottage cheese', amount: '1', unit: 'cup' },
    { name: 'Pineapple or berries', amount: '1/2', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Spoon cottage cheese into a bowl' },
    { number: 2, instruction: 'Top with pineapple chunks or berries' }
  ]
},
{
  id: 'protein-smoothie',
  title: 'Protein Smoothie (whey, oats, banana, almond butter, milk)',
  prepTime: '5 min',
  servings: 1,
  calories: 420,
  protein: 32,
  carbs: 45,
  fat: 12,
  category: 'snack',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761597100/Firefly_A_meal_of_Protein_Smoothie_whey_oats_banana_almond_butter_milk_on_a_table_191989_nabfpg.jpg',
  ingredients: [
    { name: 'Whey protein powder', amount: '1', unit: 'scoop' },
    { name: 'Oats', amount: '1/4', unit: 'cup' },
    { name: 'Banana', amount: '1', unit: 'medium' },
    { name: 'Almond butter', amount: '1', unit: 'tbsp' },
    { name: 'Milk', amount: '1', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Add all ingredients to a blender' },
    { number: 2, instruction: 'Blend until smooth' }
  ]
},
{
  id: 'hardboiled-eggs-crackers',
  title: 'Hard-Boiled Eggs with Whole Wheat Crackers',
  prepTime: '10 min',
  servings: 1,
  calories: 260,
  protein: 16,
  carbs: 20,
  fat: 12,
  category: 'snack',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761597194/Firefly_A_meal_of_Hard-Boiled_Eggs_with_Whole_Wheat_Crackers_on_a_table_946120_fzymfe.jpg',
  ingredients: [
    { name: 'Eggs', amount: '2', unit: 'large, hard-boiled' },
    { name: 'Whole wheat crackers', amount: '6', unit: 'pieces' }
  ],
  instructions: [
    { number: 1, instruction: 'Boil eggs, peel, and slice' },
    { number: 2, instruction: 'Serve with crackers on the side' }
  ]
},
{
  id: 'trail-mix',
  title: 'Trail Mix (nuts, seeds, dried fruit, dark chocolate chunks)',
  prepTime: '2 min',
  servings: 1,
  calories: 300,
  protein: 10,
  carbs: 28,
  fat: 18,
  category: 'snack',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761597310/Firefly_A_meal_of_Trail_Mix_nuts_seeds_dried_fruit_dark_chocolate_chunks_on_a_table_284487_yoloce.jpg',
  ingredients: [
    { name: 'Mixed nuts', amount: '1/4', unit: 'cup' },
    { name: 'Seeds', amount: '2', unit: 'tbsp' },
    { name: 'Dried fruit', amount: '2', unit: 'tbsp' },
    { name: 'Dark chocolate chunks', amount: '1', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Mix all ingredients in a small container' },
    { number: 2, instruction: 'Enjoy as a quick snack' }
  ]
},
{
  id: 'hummus-pita-carrots',
  title: 'Hummus with Whole Grain Pita and Carrot Sticks',
  prepTime: '5 min',
  servings: 1,
  calories: 320,
  protein: 12,
  carbs: 38,
  fat: 14,
  category: 'snack',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761597414/Firefly_A_meal_of_Hummus_with_Whole_Grain_Pita_and_Carrot_Sticks_on_a_table_284487_di2lww.jpg',
  ingredients: [
    { name: 'Hummus', amount: '1/4', unit: 'cup' },
    { name: 'Whole grain pita', amount: '1', unit: 'piece' },
    { name: 'Carrot sticks', amount: '1', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Cut pita into triangles' },
    { number: 2, instruction: 'Serve pita and carrots with hummus' }
  ]
},
{
  id: 'beef-jerky-almonds',
  title: 'Beef Jerky with a Handful of Almonds',
  prepTime: '2 min',
  servings: 1,
  calories: 280,
  protein: 22,
  carbs: 6,
  fat: 18,
  category: 'snack',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761597513/Firefly_A_meal_of_Beef_Jerky_with_a_Handful_of_Almonds_on_a_table_685752_kgoay4.jpg',
  ingredients: [
    { name: 'Beef jerky', amount: '2', unit: 'oz' },
    { name: 'Almonds', amount: '1/4', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Combine jerky and almonds in a small container' },
    { number: 2, instruction: 'Snack on the go' }
  ]
},
{
  id: 'avocado-toast-pumpkin-seeds',
  title: 'Avocado Toast on Whole Grain Bread with Pumpkin Seeds',
  prepTime: '7 min',
  servings: 1,
  calories: 330,
  protein: 10,
  carbs: 32,
  fat: 18,
  category: 'snack',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761597659/Firefly_A_meal_of_Avocado_Toast_on_Whole_Grain_Bread_with_Pumpkin_Seeds_on_a_table_670908_tc905i.jpg',
  ingredients: [
    { name: 'Whole grain bread', amount: '1', unit: 'slice' },
    { name: 'Avocado', amount: '1/2', unit: 'medium' },
    { name: 'Pumpkin seeds', amount: '1', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Toast bread' },
    { number: 2, instruction: 'Mash avocado onto toast' },
    { number: 3, instruction: 'Sprinkle with pumpkin seeds' }
  ]
},
{
  id: 'apple-pb-milk',
  title: 'Apple Slices with Peanut Butter and a Glass of Milk',
  prepTime: '5 min',
  servings: 1,
  calories: 300,
  protein: 12,
  carbs: 40,
  fat: 12,
  category: 'snack',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761597808/Firefly_A_meal_of_Apple_Slices_with_Peanut_Butter_and_a_Glass_of_Milk_on_a_table_685752_gpapnd.jpg',
  ingredients: [
    { name: 'Apple', amount: '1', unit: 'medium, sliced' },
    { name: 'Peanut butter', amount: '2', unit: 'tbsp' },
    { name: 'Milk', amount: '1', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Slice apple and serve with peanut butter' },
    { number: 2, instruction: 'Enjoy with a glass of milk' }
  ]
},
{
  id: 'bulk-omelet-eggs-whites',
  title: 'Omelet with Whole Eggs & Egg Whites',
  prepTime: '10 min',
  servings: 1,
  calories: 420,
  protein: 40,
  carbs: 6,
  fat: 25,
  category: 'breakfast',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761597977/Firefly_A_meal_of_Omelet_with_Whole_Eggs_Egg_Whites_on_a_plate_685752_dgakcm.jpg',
  ingredients: [
    { name: 'Whole eggs', amount: '3', unit: 'large' },
    { name: 'Egg whites', amount: '4', unit: 'large' },
    { name: 'Spinach', amount: '1', unit: 'cup' },
    { name: 'Mushrooms', amount: '1/2', unit: 'cup' },
    { name: 'Olive oil', amount: '1', unit: 'tbsp' },
    { name: 'Cheddar cheese', amount: '1/4', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Whisk eggs and egg whites together' },
    { number: 2, instruction: 'Heat olive oil in pan' },
    { number: 3, instruction: 'Add vegetables and sauté until tender' },
    { number: 4, instruction: 'Pour eggs over vegetables and cook until set' },
    { number: 5, instruction: 'Sprinkle with cheese and fold omelet' }
  ]
},
{
  id: 'bulk-oats-protein',
  title: 'Oats with Protein Powder',
  prepTime: '5 min',
  servings: 1,
  calories: 480,
  protein: 38,
  carbs: 60,
  fat: 10,
  category: 'breakfast',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761598229/Firefly_A_meal_of_Oats_with_Protein_Powder_and_banana_946120_zmsbbl.jpg',
  ingredients: [
    { name: 'Oats', amount: '1', unit: 'cup' },
    { name: 'Protein powder', amount: '1.5', unit: 'scoops' },
    { name: 'Milk', amount: '1', unit: 'cup' },
    { name: 'Peanut butter', amount: '1', unit: 'tbsp' },
    { name: 'Banana', amount: '1', unit: 'medium' }
  ],
  instructions: [
    { number: 1, instruction: 'Cook oats in milk until creamy' },
    { number: 2, instruction: 'Stir in protein powder' },
    { number: 3, instruction: 'Top with banana and peanut butter' }
  ]
},
{
  id: 'bulk-greek-yogurt-parfait',
  title: 'Greek Yogurt Parfait',
  prepTime: '5 min',
  servings: 1,
  calories: 350,
  protein: 28,
  carbs: 40,
  fat: 6,
  category: 'breakfast',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761601630/Firefly_A_meal_of_Greek_Yogurt_Parfait_946120_mm6puv.jpg',
  ingredients: [
    { name: 'Greek yogurt', amount: '1', unit: 'cup' },
    { name: 'Granola', amount: '1/3', unit: 'cup' },
    { name: 'Mixed berries', amount: '1/2', unit: 'cup' },
    { name: 'Honey', amount: '1', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Layer yogurt in a bowl or glass' },
    { number: 2, instruction: 'Top with granola and berries' },
    { number: 3, instruction: 'Drizzle with honey' }
  ]
},
{
  id: 'bulk-breakfast-burrito',
  title: 'Breakfast Burrito',
  prepTime: '15 min',
  servings: 1,
  calories: 600,
  protein: 40,
  carbs: 55,
  fat: 22,
  category: 'breakfast',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761601924/Firefly_A_meal_of_Breakfast_Burritos_685752_rtyyhf.jpg',
  ingredients: [
    { name: 'Whole eggs', amount: '3', unit: 'large' },
    { name: 'Egg whites', amount: '2', unit: 'large' },
    { name: 'Chicken sausage', amount: '3', unit: 'oz' },
    { name: 'Whole wheat tortilla', amount: '1', unit: 'large' },
    { name: 'Cheddar cheese', amount: '1/4', unit: 'cup' },
    { name: 'Salsa', amount: '2', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Scramble eggs and egg whites in pan' },
    { number: 2, instruction: 'Cook sausage until browned' },
    { number: 3, instruction: 'Place eggs, sausage, and cheese inside tortilla' },
    { number: 4, instruction: 'Roll tightly and heat on skillet' },
    { number: 5, instruction: 'Serve with salsa' }
  ]
},
{
  id: 'bulk-steak-eggs',
  title: 'Steak & Eggs',
  prepTime: '20 min',
  servings: 1,
  calories: 700,
  protein: 55,
  carbs: 5,
  fat: 48,
  category: 'breakfast',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761601796/Firefly_A_meal_of_Steak_Eggs_685752_m9kj3d.jpg',
  ingredients: [
    { name: 'Sirloin steak', amount: '8', unit: 'oz' },
    { name: 'Whole eggs', amount: '3', unit: 'large' },
    { name: 'Butter', amount: '1', unit: 'tbsp' },
    { name: 'Salt & pepper', amount: 'to taste', unit: '' }
  ],
  instructions: [
    { number: 1, instruction: 'Season and grill steak to desired doneness' },
    { number: 2, instruction: 'Fry eggs in butter until desired doneness' },
    { number: 3, instruction: 'Serve steak with eggs on side' }
  ]
},
{
  id: 'bulk-cottage-cheese-bowl',
  title: 'Cottage Cheese Bowl',
  prepTime: '5 min',
  servings: 1,
  calories: 320,
  protein: 34,
  carbs: 20,
  fat: 8,
  category: 'breakfast',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761602499/Firefly_A_meal_of_Cottage_Cheese_Bowl_with_pineapple_and_almonds_284487_ngherv.jpg',
  ingredients: [
    { name: 'Cottage cheese', amount: '1', unit: 'cup' },
    { name: 'Pineapple chunks', amount: '1/2', unit: 'cup' },
    { name: 'Almonds', amount: '2', unit: 'tbsp' },
    { name: 'Chia seeds', amount: '1', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Spoon cottage cheese into bowl' },
    { number: 2, instruction: 'Top with pineapple, almonds, and chia seeds' }
  ]
},
{
  id: 'bulk-bagel-sandwich',
  title: 'Bagel Sandwich',
  prepTime: '10 min',
  servings: 1,
  calories: 550,
  protein: 32,
  carbs: 60,
  fat: 18,
  category: 'breakfast',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761602636/Firefly_A_meal_of_Bagel_Sandwich_284487_1_og5vbf.jpg',
  ingredients: [
    { name: 'Whole grain bagel', amount: '1', unit: 'whole' },
    { name: 'Turkey breast', amount: '4', unit: 'oz' },
    { name: 'Egg', amount: '1', unit: 'large' },
    { name: 'Cheddar cheese', amount: '1', unit: 'slice' },
    { name: 'Spinach', amount: '1/4', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Toast bagel' },
    { number: 2, instruction: 'Cook egg to preference' },
    { number: 3, instruction: 'Layer turkey, egg, cheese, and spinach on bagel' }
  ]
},
{
  id: 'bulk-protein-pancakes-alt',
  title: 'Pancakes with Protein',
  prepTime: '15 min',
  servings: 2,
  calories: 620,
  protein: 42,
  carbs: 65,
  fat: 16,
  category: 'breakfast',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761602745/Firefly_A_meal_of_Pancakes_with_Protein_284487_a1f3sg.jpg',
  ingredients: [
    { name: 'Protein powder', amount: '1.5', unit: 'scoops' },
    { name: 'Oats', amount: '1', unit: 'cup' },
    { name: 'Eggs', amount: '2', unit: 'whole' },
    { name: 'Banana', amount: '1', unit: 'large' },
    { name: 'Almond milk', amount: '1/2', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Blend oats, protein powder, eggs, banana, and milk' },
    { number: 2, instruction: 'Heat pan and pour batter to form pancakes' },
    { number: 3, instruction: 'Cook 2-3 minutes per side until golden' }
  ]
},
{
  id: 'bulk-quinoa-breakfast-bowl',
  title: 'Quinoa Breakfast Bowl',
  prepTime: '15 min',
  servings: 1,
  calories: 500,
  protein: 28,
  carbs: 65,
  fat: 14,
  category: 'breakfast',
  tags: ['high-protein', 'bulk'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761602900/Firefly_A_meal_of_Quinoa_Breakfast_Bowl_with_blueberries_and_almonds._670908_xguo1d.jpg',
  ingredients: [
    { name: 'Quinoa', amount: '1', unit: 'cup cooked' },
    { name: 'Greek yogurt', amount: '1/2', unit: 'cup' },
    { name: 'Blueberries', amount: '1/2', unit: 'cup' },
    { name: 'Almonds', amount: '2', unit: 'tbsp' },
    { name: 'Honey', amount: '1', unit: 'tsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Cook quinoa and let cool slightly' },
    { number: 2, instruction: 'Top with yogurt, blueberries, and almonds' },
    { number: 3, instruction: 'Drizzle with honey before serving' }
  ]
},
  {
    id: 'bulk-chicken-rice-veggies',
    title: 'Grilled Chicken with Rice and Vegetables',
    prepTime: '25 min',
    servings: 1,
    calories: 650,
    protein: 52,
    carbs: 60,
    fat: 18,
    category: 'lunch',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761602996/Firefly_A_meal_of_Grilled_Chicken_with_Rice_carrots_and_broccoli_284487_aqa6ud.jpg',
    ingredients: [
      { name: 'Chicken breast', amount: '7', unit: 'oz' },
      { name: 'Brown rice', amount: '1.5', unit: 'cups cooked' },
      { name: 'Broccoli', amount: '1', unit: 'cup' },
      { name: 'Carrots', amount: '1/2', unit: 'cup' },
      { name: 'Olive oil', amount: '1', unit: 'tbsp' }
    ],
    instructions: [
      { number: 1, instruction: 'Season chicken breast and grill until fully cooked' },
      { number: 2, instruction: 'Cook brown rice according to package directions' },
      { number: 3, instruction: 'Steam or sauté vegetables in olive oil' },
      { number: 4, instruction: 'Serve chicken with rice and vegetables' }
    ]
  },
  {
    id: 'bulk-ground-beef-sweet-potato',
    title: 'Ground Beef with Sweet Potatoes',
    prepTime: '20 min',
    servings: 1,
    calories: 720,
    protein: 45,
    carbs: 65,
    fat: 28,
    category: 'lunch',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761603098/Firefly_A_meal_of_Ground_Beef_with_Sweet_Potatoes_670908_c3iopp.jpg',
    ingredients: [
      { name: 'Lean ground beef', amount: '6', unit: 'oz' },
      { name: 'Sweet potato', amount: '1', unit: 'medium' },
      { name: 'Spinach', amount: '1', unit: 'cup' },
      { name: 'Olive oil', amount: '1', unit: 'tbsp' }
    ],
    instructions: [
      { number: 1, instruction: 'Cook ground beef in skillet until browned' },
      { number: 2, instruction: 'Roast or microwave sweet potato until tender' },
      { number: 3, instruction: 'Sauté spinach in olive oil until wilted' },
      { number: 4, instruction: 'Serve beef with sweet potato and spinach' }
    ]
  },
  {
    id: 'bulk-salmon-quinoa-asparagus',
    title: 'Salmon with Quinoa and Asparagus',
    prepTime: '25 min',
    servings: 1,
    calories: 680,
    protein: 48,
    carbs: 55,
    fat: 26,
    category: 'lunch',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761603160/Firefly_A_meal_of_Salmon_with_Quinoa_and_Asparagus_284487_sh1kbo.jpg',
    ingredients: [
      { name: 'Salmon fillet', amount: '7', unit: 'oz' },
      { name: 'Quinoa', amount: '1', unit: 'cup cooked' },
      { name: 'Asparagus', amount: '1', unit: 'cup' },
      { name: 'Olive oil', amount: '1', unit: 'tbsp' },
      { name: 'Lemon juice', amount: '1', unit: 'tbsp' }
    ],
    instructions: [
      { number: 1, instruction: 'Season salmon with lemon, salt, and pepper' },
      { number: 2, instruction: 'Bake or grill salmon until cooked through' },
      { number: 3, instruction: 'Cook quinoa according to package instructions' },
      { number: 4, instruction: 'Steam asparagus until tender' },
      { number: 5, instruction: 'Serve salmon with quinoa and asparagus' }
    ]
  },
  {
    id: 'bulk-turkey-avocado-wrap',
    title: 'Turkey and Avocado Wrap',
    prepTime: '10 min',
    servings: 1,
    calories: 540,
    protein: 38,
    carbs: 42,
    fat: 20,
    category: 'lunch',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761603245/Firefly_A_meal_of_Turkey_and_Avocado_Wrap_284487_ld2yit.jpg',
    ingredients: [
      { name: 'Whole wheat tortilla', amount: '1', unit: 'large' },
      { name: 'Turkey breast', amount: '6', unit: 'oz' },
      { name: 'Avocado', amount: '1/2', unit: 'medium' },
      { name: 'Lettuce', amount: '1', unit: 'cup' },
      { name: 'Tomato', amount: '2', unit: 'slices' },
      { name: 'Greek yogurt', amount: '2', unit: 'tbsp' }
    ],
    instructions: [
      { number: 1, instruction: 'Lay tortilla flat and spread Greek yogurt' },
      { number: 2, instruction: 'Layer turkey, avocado slices, lettuce, and tomato' },
      { number: 3, instruction: 'Roll tightly into a wrap and slice in half' }
    ]
  },
  {
    id: 'bulk-shrimp-stirfry-rice',
    title: 'Shrimp Stir-Fry with Brown Rice',
    prepTime: '20 min',
    servings: 1,
    calories: 610,
    protein: 42,
    carbs: 62,
    fat: 16,
    category: 'lunch',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761603300/Firefly_A_meal_of_Shrimp_Stir-Fry_with_Brown_Rice_284487_js2ork.jpg',
    ingredients: [
      { name: 'Shrimp', amount: '7', unit: 'oz' },
      { name: 'Brown rice', amount: '1.5', unit: 'cups cooked' },
      { name: 'Bell peppers', amount: '1', unit: 'cup' },
      { name: 'Broccoli', amount: '1', unit: 'cup' },
      { name: 'Soy sauce', amount: '2', unit: 'tbsp' },
      { name: 'Olive oil', amount: '1', unit: 'tbsp' }
    ],
    instructions: [
      { number: 1, instruction: 'Cook brown rice according to package directions' },
      { number: 2, instruction: 'Heat olive oil in pan and stir-fry shrimp until pink' },
      { number: 3, instruction: 'Add vegetables and cook until tender-crisp' },
      { number: 4, instruction: 'Stir in soy sauce and serve over rice' }
    ]
  },
  {
    id: 'bulk-beef-chili-beans',
    title: 'Beef Chili with Beans',
    prepTime: '30 min',
    servings: 2,
    calories: 720,
    protein: 50,
    carbs: 55,
    fat: 28,
    category: 'lunch',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761603364/Firefly_A_meal_of_Beef_Chili_with_Beans_284487_liy94p.jpg',
    ingredients: [
      { name: 'Lean ground beef', amount: '1', unit: 'lb' },
      { name: 'Kidney beans', amount: '1', unit: 'cup' },
      { name: 'Black beans', amount: '1', unit: 'cup' },
      { name: 'Tomato sauce', amount: '1', unit: 'cup' },
      { name: 'Onion', amount: '1/2', unit: 'cup chopped' },
      { name: 'Chili powder', amount: '1', unit: 'tbsp' }
    ],
    instructions: [
      { number: 1, instruction: 'Cook ground beef with onions until browned' },
      { number: 2, instruction: 'Add beans, tomato sauce, and chili powder' },
      { number: 3, instruction: 'Simmer for 20 minutes, stirring occasionally' },
      { number: 4, instruction: 'Serve hot' }
    ]
  },
  {
    id: 'bulk-tuna-pasta-salad',
    title: 'Tuna and Pasta Salad',
    prepTime: '15 min',
    servings: 2,
    calories: 560,
    protein: 42,
    carbs: 55,
    fat: 16,
    category: 'lunch',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761676613/Firefly_A_meal_of_Tuna_and_Pasta_Salad_394769_lley2q.jpg',
    ingredients: [
      { name: 'Whole wheat pasta', amount: '2', unit: 'cups cooked' },
      { name: 'Canned tuna', amount: '6', unit: 'oz' },
      { name: 'Greek yogurt', amount: '1/4', unit: 'cup' },
      { name: 'Celery', amount: '1/2', unit: 'cup chopped' },
      { name: 'Lemon juice', amount: '1', unit: 'tbsp' }
    ],
    instructions: [
      { number: 1, instruction: 'Cook pasta and let cool slightly' },
      { number: 2, instruction: 'Mix tuna with Greek yogurt and lemon juice' },
      { number: 3, instruction: 'Add pasta and celery, stir until combined' }
    ]
  },
  {
    id: 'bulk-chicken-burrito-bowl',
    title: 'Chicken Burrito Bowl',
    prepTime: '20 min',
    servings: 1,
    calories: 670,
    protein: 48,
    carbs: 68,
    fat: 20,
    category: 'lunch',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761676679/Firefly_A_meal_of_Chicken_Burrito_Bowl_394769_ozb1pw.jpg',
    ingredients: [
      { name: 'Chicken breast', amount: '6', unit: 'oz' },
      { name: 'Brown rice', amount: '1.5', unit: 'cups cooked' },
      { name: 'Black beans', amount: '1/2', unit: 'cup' },
      { name: 'Corn', amount: '1/2', unit: 'cup' },
      { name: 'Salsa', amount: '1/4', unit: 'cup' },
      { name: 'Avocado', amount: '1/2', unit: 'medium' }
    ],
    instructions: [
      { number: 1, instruction: 'Grill chicken breast and slice into strips' },
      { number: 2, instruction: 'Cook rice and assemble in a bowl' },
      { number: 3, instruction: 'Top with beans, corn, salsa, and avocado' },
      { number: 4, instruction: 'Serve immediately' }
    ]
  },
  {
    id: 'bulk-turkey-meatballs-pasta',
    title: 'Turkey Meatballs with Whole Wheat Pasta',
    prepTime: '30 min',
    servings: 2,
    calories: 640,
    protein: 46,
    carbs: 65,
    fat: 20,
    category: 'lunch',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761676751/Firefly_A_meal_of_Turkey_Meatballs_with_Whole_Wheat_Pasta_394769_affw3m.jpg',
    ingredients: [
      { name: 'Ground turkey', amount: '8', unit: 'oz' },
      { name: 'Whole wheat pasta', amount: '3', unit: 'cups cooked' },
      { name: 'Marinara sauce', amount: '1', unit: 'cup' },
      { name: 'Parmesan cheese', amount: '2', unit: 'tbsp' },
      { name: 'Olive oil', amount: '1', unit: 'tbsp' }
    ],
    instructions: [
      { number: 1, instruction: 'Form ground turkey into meatballs and bake at 375°F for 20 minutes' },
      { number: 2, instruction: 'Cook pasta according to package directions' },
      { number: 3, instruction: 'Heat marinara sauce and add meatballs' },
      { number: 4, instruction: 'Serve pasta with sauce and top with parmesan' }
    ]
  },
  {
    id: 'bulk-steak-roasted-potatoes',
    title: 'Grilled Steak with Roasted Potatoes',
    prepTime: '30 min',
    servings: 1,
    calories: 750,
    protein: 54,
    carbs: 58,
    fat: 30,
    category: 'lunch',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761676827/Firefly_A_meal_of_Grilled_Steak_with_Roasted_Potatoes_394769_pn0pbr.jpg',
    ingredients: [
      { name: 'Sirloin steak', amount: '8', unit: 'oz' },
      { name: 'Potatoes', amount: '1.5', unit: 'cups cubed' },
      { name: 'Olive oil', amount: '1', unit: 'tbsp' },
      { name: 'Green beans', amount: '1', unit: 'cup' }
    ],
    instructions: [
      { number: 1, instruction: 'Toss potatoes with olive oil and roast at 400°F for 25 minutes' },
      { number: 2, instruction: 'Season steak and grill to desired doneness' },
      { number: 3, instruction: 'Steam green beans until tender' },
      { number: 4, instruction: 'Serve steak with potatoes and green beans' }
    ]
  }
];

// Cut meals for weight loss
const cutMeals: Meal[] = [
  {
    id: 'cut-chicken-salad',
    title: 'Lean Chicken Caesar Salad',
    prepTime: '15 min',
    servings: 1,
    calories: 320,
    protein: 35,
    carbs: 8,
    fat: 16,
    category: 'lunch',
    tags: ['high-protein', 'cut', 'low-calorie'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761676964/Firefly_A_meal_of_Lean_Chicken_Caesar_Salad_with_cherry_tomatoes_394769_ttudkj.jpg',
    ingredients: [
      { name: 'Chicken breast', amount: '5', unit: 'oz' },
      { name: 'Romaine lettuce', amount: '3', unit: 'cups' },
      { name: 'Light Caesar dressing', amount: '2', unit: 'tbsp' },
      { name: 'Parmesan cheese', amount: '1', unit: 'tbsp' },
      { name: 'Cherry tomatoes', amount: '1/2', unit: 'cup' }
    ],
    instructions: [
      { number: 1, instruction: 'Grill chicken breast and slice' },
      { number: 2, instruction: 'Chop romaine lettuce' },
      { number: 3, instruction: 'Toss lettuce with dressing' },
      { number: 4, instruction: 'Top with chicken, tomatoes, and parmesan' }
    ]
  },
{
  id: 'eggwhite-omelet-spinach-mushrooms',
  title: 'Eggwhite omelet Spinach Mushrooms',
  prepTime: '10 min',
  servings: 1,
  calories: 210,
  protein: 26,
  carbs: 6,
  fat: 8,
  category: 'breakfast',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761677031/Firefly_A_meal_of_Egg_White_Omelet_with_Spinach_and_Mushrooms_394769_xvzdna.jpg',
  ingredients: [
    { name: 'Egg whites', amount: '6', unit: 'large' },
    { name: 'Spinach', amount: '1', unit: 'cup' },
    { name: 'Mushrooms', amount: '1/2', unit: 'cup, sliced' },
    { name: 'Olive oil spray', amount: '1', unit: 'tsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Heat pan with olive oil spray' },
    { number: 2, instruction: 'Add spinach and mushrooms, cook until soft' },
    { number: 3, instruction: 'Pour in egg whites and cook until set' }
  ]
},
{
  id: 'oats-berries-chia-protein',
  title: 'Oats with Berries, Chia Seeds, and a Scoop of Protein Powder',
  prepTime: '7 min',
  servings: 1,
  calories: 310,
  protein: 24,
  carbs: 45,
  fat: 7,
  category: 'breakfast',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761677094/Firefly_A_meal_of_Oats_with_Berries_Chia_Seeds_and_a_Scoop_of_Protein_Powder_394769_objlmw.jpg',
  ingredients: [
    { name: 'Rolled oats', amount: '1/2', unit: 'cup' },
    { name: 'Mixed berries', amount: '1/2', unit: 'cup' },
    { name: 'Chia seeds', amount: '1', unit: 'tbsp' },
    { name: 'Protein powder', amount: '1', unit: 'scoop' },
    { name: 'Water or almond milk', amount: '1', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Cook oats with liquid of choice' },
    { number: 2, instruction: 'Stir in protein powder and chia seeds' },
    { number: 3, instruction: 'Top with fresh berries' }
  ]
},
{
  id: 'greek-yogurt-strawberries-almonds',
  title: 'Greek Yogurt with Sliced Strawberries and a Sprinkle of Almonds',
  prepTime: '5 min',
  servings: 1,
  calories: 260,
  protein: 22,
  carbs: 20,
  fat: 10,
  category: 'breakfast',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761677173/Firefly_A_meal_of_Greek_Yogurt_with_Sliced_Strawberries_and_a_Sprinkle_of_Almonds_394769_wbyldx.jpg',
  ingredients: [
    { name: 'Greek yogurt', amount: '1', unit: 'cup' },
    { name: 'Strawberries', amount: '1/2', unit: 'cup, sliced' },
    { name: 'Almonds', amount: '1', unit: 'tbsp, chopped' }
  ],
  instructions: [
    { number: 1, instruction: 'Spoon yogurt into a bowl' },
    { number: 2, instruction: 'Top with strawberries and almonds' }
  ]
},
{
  id: 'scrambled-eggs-salmon-asparagus',
  title: 'Scrambled Eggs with Smoked Salmon and Asparagus',
  prepTime: '12 min',
  servings: 1,
  calories: 300,
  protein: 28,
  carbs: 5,
  fat: 18,
  category: 'breakfast',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761677286/Firefly_A_meal_of_Scrambled_Eggs_with_Smoked_Salmon_and_Asparagus_394769_wujunr.jpg',
  ingredients: [
    { name: 'Eggs', amount: '2', unit: 'large' },
    { name: 'Egg whites', amount: '3', unit: 'large' },
    { name: 'Smoked salmon', amount: '2', unit: 'oz' },
    { name: 'Asparagus', amount: '1/2', unit: 'cup, chopped' }
  ],
  instructions: [
    { number: 1, instruction: 'Steam asparagus until tender' },
    { number: 2, instruction: 'Scramble eggs and egg whites in a pan' },
    { number: 3, instruction: 'Fold in salmon and asparagus before serving' }
  ]
},
{
  id: 'cottage-cheese-peach-cinnamon',
  title: 'Cottage Cheese with Sliced Peach and Cinnamon',
  prepTime: '5 min',
  servings: 1,
  calories: 220,
  protein: 20,
  carbs: 18,
  fat: 6,
  category: 'breakfast',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761677372/Firefly_A_meal_of_Cottage_Cheese_with_Sliced_Peach_and_Cinnamon_394769_czxm4o.jpg',
  ingredients: [
    { name: 'Cottage cheese', amount: '1', unit: 'cup' },
    { name: 'Peach', amount: '1/2', unit: 'medium, sliced' },
    { name: 'Cinnamon', amount: '1/4', unit: 'tsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Spoon cottage cheese into a bowl' },
    { number: 2, instruction: 'Top with peach slices and sprinkle with cinnamon' }
  ]
},
{
  id: 'protein-pancakes-blueberries',
  title: 'Protein Pancakes (oats, egg whites, whey) topped with Blueberries',
  prepTime: '15 min',
  servings: 1,
  calories: 320,
  protein: 30,
  carbs: 35,
  fat: 6,
  category: 'breakfast',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761677524/Firefly_A_meal_of_Protein_Pancakes_oats_egg_whites_whey_topped_with_Blueberries_394769_rbmdif.jpg',
  ingredients: [
    { name: 'Rolled oats', amount: '1/2', unit: 'cup' },
    { name: 'Egg whites', amount: '4', unit: 'large' },
    { name: 'Protein powder', amount: '1', unit: 'scoop' },
    { name: 'Blueberries', amount: '1/4', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Blend oats, egg whites, and protein powder into batter' },
    { number: 2, instruction: 'Cook pancakes on a non-stick pan' },
    { number: 3, instruction: 'Top with blueberries before serving' }
  ]
},
{
  id: 'avocado-toast-poached-egg',
  title: 'Avocado Toast on Whole Grain Bread with a Poached Egg',
  prepTime: '10 min',
  servings: 1,
  calories: 290,
  protein: 16,
  carbs: 28,
  fat: 14,
  category: 'breakfast',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761677601/Firefly_A_meal_of_Avocado_Toast_on_Whole_Grain_Bread_with_a_Poached_Egg_394769_lamxdf.jpg',
  ingredients: [
    { name: 'Whole grain bread', amount: '1', unit: 'slice' },
    { name: 'Avocado', amount: '1/4', unit: 'medium' },
    { name: 'Egg', amount: '1', unit: 'large, poached' }
  ],
  instructions: [
    { number: 1, instruction: 'Toast bread and mash avocado on top' },
    { number: 2, instruction: 'Place poached egg over avocado toast' }
  ]
},
{
  id: 'green-smoothie-protein',
  title: 'Smoothie (spinach, banana, protein powder, almond milk)',
  prepTime: '5 min',
  servings: 1,
  calories: 260,
  protein: 25,
  carbs: 30,
  fat: 6,
  category: 'breakfast',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761677726/Firefly_A_meal_of_Smoothie_spinach_banana_protein_powder_almond_milk_394769_y77jhb.jpg',
  ingredients: [
    { name: 'Spinach', amount: '1', unit: 'cup' },
    { name: 'Banana', amount: '1', unit: 'medium' },
    { name: 'Protein powder', amount: '1', unit: 'scoop' },
    { name: 'Almond milk', amount: '1', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Add all ingredients to a blender' },
    { number: 2, instruction: 'Blend until smooth' }
  ]
},
{
  id: 'turkey-veggie-breakfast-wrap',
  title: 'Turkey and Veggie Breakfast Wrap in a Low-Carb Tortilla',
  prepTime: '12 min',
  servings: 1,
  calories: 310,
  protein: 28,
  carbs: 20,
  fat: 10,
  category: 'breakfast',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761678004/Firefly_A_meal_of_Turkey_and_Veggie_Breakfast_Wrap_in_a_Low-Carb_Tortilla_394769_f8ue5q.jpg',
  ingredients: [
    { name: 'Low-carb tortilla', amount: '1', unit: 'piece' },
    { name: 'Turkey breast slices', amount: '3', unit: 'oz' },
    { name: 'Bell peppers', amount: '1/4', unit: 'cup, sautéed' },
    { name: 'Onion', amount: '1/4', unit: 'cup, sautéed' }
  ],
  instructions: [
    { number: 1, instruction: 'Warm tortilla and fill with turkey and sautéed veggies' },
    { number: 2, instruction: 'Roll into a wrap and serve' }
  ]
},
{
  id: 'overnight-oats-flax-raspberries',
  title: 'Overnight Oats with Flaxseeds, Cinnamon, and Raspberries',
  prepTime: '5 min',
  servings: 1,
  calories: 280,
  protein: 22,
  carbs: 40,
  fat: 7,
  category: 'breakfast',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761678083/Firefly_A_meal_of_Overnight_Oats_with_Flaxseeds_Cinnamon_and_Raspberries_394769_fxy1iq.jpg',
  ingredients: [
    { name: 'Rolled oats', amount: '1/2', unit: 'cup' },
    { name: 'Flaxseeds', amount: '1', unit: 'tbsp' },
    { name: 'Cinnamon', amount: '1/4', unit: 'tsp' },
    { name: 'Raspberries', amount: '1/2', unit: 'cup' },
    { name: 'Greek yogurt', amount: '1/2', unit: 'cup' },
    { name: 'Almond milk', amount: '1/2', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Combine oats, flaxseeds, cinnamon, yogurt, and almond milk in a jar' },
    { number: 2, instruction: 'Refrigerate overnight' },
    { number: 3, instruction: 'Top with raspberries before serving' }
  ]
},
{
  id: 'grilled-chicken-salad-greens',
  title: 'Grilled Chicken Salad with Mixed Greens and Olive Oil',
  prepTime: '15 min',
  servings: 1,
  calories: 280,
  protein: 30,
  carbs: 8,
  fat: 14,
  category: 'lunch',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761678188/Firefly_A_meal_of_Grilled_Chicken_Salad_with_Mixed_Greens_and_Olive_Oil_and_cherry_tomatoes_394769_zc8i76.jpg',
  ingredients: [
    { name: 'Chicken breast', amount: '4', unit: 'oz, grilled' },
    { name: 'Mixed greens', amount: '2', unit: 'cups' },
    { name: 'Olive oil', amount: '1', unit: 'tbsp' },
    { name: 'Cherry tomatoes', amount: '1/2', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Grill chicken until cooked through' },
    { number: 2, instruction: 'Combine greens and tomatoes in a bowl' },
    { number: 3, instruction: 'Slice chicken and drizzle salad with olive oil' }
  ]
},
{
  id: 'turkey-lettuce-wraps-avocado',
  title: 'Turkey Lettuce Wraps with Avocado and Tomato',
  prepTime: '10 min',
  servings: 1,
  calories: 240,
  protein: 26,
  carbs: 6,
  fat: 12,
  category: 'lunch',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761678283/Firefly_A_meal_of_Turkey_Lettuce_Wraps_with_Avocado_and_Tomato_41633_ogtjgt.jpg',
  ingredients: [
    { name: 'Turkey breast slices', amount: '3', unit: 'oz' },
    { name: 'Romaine lettuce leaves', amount: '3', unit: 'large' },
    { name: 'Avocado', amount: '1/4', unit: 'medium, sliced' },
    { name: 'Tomato', amount: '2', unit: 'slices' }
  ],
  instructions: [
    { number: 1, instruction: 'Lay out lettuce leaves' },
    { number: 2, instruction: 'Fill with turkey, avocado, and tomato' },
    { number: 3, instruction: 'Wrap and enjoy' }
  ]
},
{
  id: 'baked-salmon-broccoli-cauliflower',
  title: 'Baked Salmon with Steamed Broccoli and Cauliflower Rice',
  prepTime: '20 min',
  servings: 1,
  calories: 320,
  protein: 34,
  carbs: 10,
  fat: 16,
  category: 'lunch',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761678374/Firefly_A_meal_of_Baked_Salmon_with_Steamed_Broccoli_and_Cauliflower_Rice_41633_gxorkb.jpg',
  ingredients: [
    { name: 'Salmon fillet', amount: '5', unit: 'oz' },
    { name: 'Broccoli', amount: '1', unit: 'cup, steamed' },
    { name: 'Cauliflower rice', amount: '1', unit: 'cup, steamed' }
  ],
  instructions: [
    { number: 1, instruction: 'Bake salmon at 400°F for 12–15 minutes' },
    { number: 2, instruction: 'Steam broccoli and cauliflower rice' },
    { number: 3, instruction: 'Serve salmon with broccoli and cauliflower rice' }
  ]
},
{
  id: 'tuna-salad-spinach-egg',
  title: 'Tuna Salad with Spinach, Cucumber, and a Hard-Boiled Egg',
  prepTime: '10 min',
  servings: 1,
  calories: 270,
  protein: 32,
  carbs: 6,
  fat: 12,
  category: 'lunch',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761678497/Firefly_A_meal_of_Tuna_Salad_with_Spinach_Cucumber_and_a_Hard-Boiled_Egg_41633_pyuyip.jpg',
  ingredients: [
    { name: 'Canned tuna (in water)', amount: '1', unit: 'can, drained' },
    { name: 'Spinach', amount: '1', unit: 'cup' },
    { name: 'Cucumber', amount: '1/2', unit: 'cup, sliced' },
    { name: 'Egg', amount: '1', unit: 'large, hard-boiled' }
  ],
  instructions: [
    { number: 1, instruction: 'Combine tuna, spinach, and cucumber in a bowl' },
    { number: 2, instruction: 'Slice egg and place on top' }
  ]
},
{
  id: 'grilled-shrimp-quinoa-zucchini',
  title: 'Grilled Shrimp with Quinoa and Roasted Zucchini',
  prepTime: '18 min',
  servings: 1,
  calories: 300,
  protein: 28,
  carbs: 26,
  fat: 9,
  category: 'lunch',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761678640/Firefly_A_meal_of_Grilled_Shrimp_with_Quinoa_and_Roasted_Zucchini_41633_tyc1jm.jpg',
  ingredients: [
    { name: 'Shrimp', amount: '5', unit: 'oz, peeled' },
    { name: 'Quinoa', amount: '1/2', unit: 'cup, cooked' },
    { name: 'Zucchini', amount: '1/2', unit: 'cup, roasted' }
  ],
  instructions: [
    { number: 1, instruction: 'Grill shrimp until pink' },
    { number: 2, instruction: 'Cook quinoa according to package directions' },
    { number: 3, instruction: 'Roast zucchini and serve together' }
  ]
},
{
  id: 'eggwhite-scramble-turkey-sausage',
  title: 'Egg White Scramble with Peppers, Onions, and Turkey Sausage',
  prepTime: '12 min',
  servings: 1,
  calories: 260,
  protein: 28,
  carbs: 8,
  fat: 10,
  category: 'lunch',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761678700/Firefly_A_meal_of_Egg_White_Scramble_with_Peppers_Onions_and_Turkey_Sausage_41633_pyce4x.jpg',
  ingredients: [
    { name: 'Egg whites', amount: '5', unit: 'large' },
    { name: 'Turkey sausage', amount: '2', unit: 'oz, sliced' },
    { name: 'Bell peppers', amount: '1/4', unit: 'cup, diced' },
    { name: 'Onion', amount: '1/4', unit: 'cup, diced' }
  ],
  instructions: [
    { number: 1, instruction: 'Cook turkey sausage in a pan' },
    { number: 2, instruction: 'Add peppers and onions, sauté until soft' },
    { number: 3, instruction: 'Add egg whites and scramble until set' }
  ]
},
{
  id: 'lean-beef-greenbeans-rice',
  title: 'Lean Ground Beef with Green Beans and a Side of Brown Rice (small portion)',
  prepTime: '15 min',
  servings: 1,
  calories: 320,
  protein: 30,
  carbs: 20,
  fat: 12,
  category: 'lunch',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761678789/Firefly_A_meal_of_Lean_Ground_Beef_with_Green_Beans_and_a_Side_of_Brown_Rice_small_portion_41633_1_mwnj1e.jpg',
  ingredients: [
    { name: 'Lean ground beef (90/10)', amount: '4', unit: 'oz' },
    { name: 'Green beans', amount: '1', unit: 'cup, steamed' },
    { name: 'Brown rice', amount: '1/2', unit: 'cup, cooked' }
  ],
  instructions: [
    { number: 1, instruction: 'Cook beef in a skillet until browned' },
    { number: 2, instruction: 'Steam green beans' },
    { number: 3, instruction: 'Serve with a small portion of brown rice' }
  ]
},
{
  id: 'grilled-cod-tacos-cabbage',
  title: 'Grilled Cod Tacos with Cabbage Slaw in Corn Tortillas',
  prepTime: '15 min',
  servings: 1,
  calories: 290,
  protein: 24,
  carbs: 28,
  fat: 9,
  category: 'lunch',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761678867/Firefly_A_meal_of_Grilled_Cod_Tacos_with_Cabbage_Slaw_in_Corn_Tortillas_41633_omoxof.jpg',
  ingredients: [
    { name: 'Cod fillet', amount: '4', unit: 'oz, grilled' },
    { name: 'Corn tortillas', amount: '2', unit: 'pieces' },
    { name: 'Cabbage slaw', amount: '1/2', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Grill cod until flaky' },
    { number: 2, instruction: 'Warm tortillas' },
    { number: 3, instruction: 'Assemble tacos with fish and slaw' }
  ]
},
{
  id: 'chicken-stirfry-bellpeppers-snappeas',
  title: 'Chicken Stir-Fry with Bell Peppers and Snap Peas (light soy sauce)',
  prepTime: '15 min',
  servings: 1,
  calories: 300,
  protein: 32,
  carbs: 18,
  fat: 10,
  category: 'lunch',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761678969/Firefly_A_meal_of_Chicken_Stir-Fry_with_Bell_Peppers_and_Snap_Peas_light_soy_sauce_41633_1_e2panc.jpg',
  ingredients: [
    { name: 'Chicken breast', amount: '4', unit: 'oz, sliced' },
    { name: 'Bell peppers', amount: '1/2', unit: 'cup, sliced' },
    { name: 'Snap peas', amount: '1/2', unit: 'cup' },
    { name: 'Light soy sauce', amount: '1', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Cook chicken in a pan until browned' },
    { number: 2, instruction: 'Add bell peppers and snap peas' },
    { number: 3, instruction: 'Stir in soy sauce and cook until veggies are crisp-tender' }
  ]
},
{
  id: 'lentil-soup-mixed-greens',
  title: 'Lentil Soup with a Side of Mixed Greens',
  prepTime: '20 min',
  servings: 1,
  calories: 260,
  protein: 18,
  carbs: 32,
  fat: 6,
  category: 'lunch',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761679042/Firefly_A_meal_of_Lentil_Soup_with_a_Side_of_Mixed_Greens_41633_tdaues.jpg',
  ingredients: [
    { name: 'Lentil soup', amount: '1', unit: 'cup' },
    { name: 'Mixed greens', amount: '1', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Warm lentil soup in a pot' },
    { number: 2, instruction: 'Serve with fresh mixed greens on the side' }
  ]
},
{
  id: 'grilled-salmon-asparagus-lemon',
  title: 'Grilled Salmon with Roasted Asparagus and Lemon',
  prepTime: '20 min',
  servings: 1,
  calories: 340,
  protein: 36,
  carbs: 8,
  fat: 18,
  category: 'dinner',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761679107/Firefly_A_meal_of_Grilled_Salmon_with_Roasted_Asparagus_and_Lemon_41633_ogdix6.jpg',
  ingredients: [
    { name: 'Salmon fillet', amount: '5', unit: 'oz' },
    { name: 'Asparagus', amount: '1', unit: 'cup' },
    { name: 'Olive oil', amount: '1', unit: 'tbsp' },
    { name: 'Lemon', amount: '1', unit: 'wedge' }
  ],
  instructions: [
    { number: 1, instruction: 'Grill salmon until cooked through' },
    { number: 2, instruction: 'Roast asparagus with olive oil' },
    { number: 3, instruction: 'Serve with a squeeze of lemon' }
  ]
},
{
  id: 'baked-chicken-broccoli-mash',
  title: 'Baked Chicken Breast with Steamed Broccoli and Cauliflower Mash',
  prepTime: '25 min',
  servings: 1,
  calories: 310,
  protein: 38,
  carbs: 12,
  fat: 12,
  category: 'dinner',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761679166/Firefly_A_meal_of_Baked_Chicken_Breast_with_Steamed_Broccoli_and_Cauliflower_Mash_41633_upxnug.jpg',
  ingredients: [
    { name: 'Chicken breast', amount: '6', unit: 'oz' },
    { name: 'Broccoli', amount: '1', unit: 'cup' },
    { name: 'Cauliflower', amount: '1', unit: 'cup, mashed' }
  ],
  instructions: [
    { number: 1, instruction: 'Bake chicken at 400°F for 20 minutes' },
    { number: 2, instruction: 'Steam broccoli' },
    { number: 3, instruction: 'Mash cauliflower and season to taste' }
  ]
},
{
  id: 'turkey-meatballs-zucchini-noodles',
  title: 'Turkey Meatballs with Zucchini Noodles and Marinara',
  prepTime: '25 min',
  servings: 1,
  calories: 320,
  protein: 34,
  carbs: 14,
  fat: 14,
  category: 'dinner',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761679246/Firefly_A_meal_of_Turkey_Meatballs_with_Zucchini_Noodles_and_Marinara_41633_alg39v.jpg',
  ingredients: [
    { name: 'Ground turkey', amount: '6', unit: 'oz' },
    { name: 'Zucchini noodles', amount: '1.5', unit: 'cups' },
    { name: 'Marinara sauce', amount: '1/2', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Form turkey into meatballs and bake' },
    { number: 2, instruction: 'Sauté zucchini noodles lightly' },
    { number: 3, instruction: 'Top with marinara and serve' }
  ]
},
{
  id: 'shrimp-skewers-peppers-quinoa',
  title: 'Grilled Shrimp Skewers with Bell Peppers and Quinoa',
  prepTime: '20 min',
  servings: 1,
  calories: 330,
  protein: 32,
  carbs: 28,
  fat: 10,
  category: 'dinner',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761679327/Firefly_A_meal_of_Grilled_Shrimp_Skewers_with_Bell_Peppers_and_Quinoa_41633_lty02p.jpg',
  ingredients: [
    { name: 'Shrimp', amount: '6', unit: 'oz' },
    { name: 'Bell peppers', amount: '1', unit: 'cup, chopped' },
    { name: 'Quinoa', amount: '1/2', unit: 'cup, cooked' }
  ],
  instructions: [
    { number: 1, instruction: 'Thread shrimp and peppers onto skewers' },
    { number: 2, instruction: 'Grill until shrimp are pink' },
    { number: 3, instruction: 'Serve with cooked quinoa' }
  ]
},
{
  id: 'lean-steak-brussels-sweetpotato',
  title: 'Lean Steak with Roasted Brussels Sprouts and a Small Sweet Potato',
  prepTime: '25 min',
  servings: 1,
  calories: 370,
  protein: 36,
  carbs: 28,
  fat: 14,
  category: 'dinner',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761679389/Firefly_A_meal_of_Lean_Steak_with_Roasted_Brussels_Sprouts_and_a_Small_Sweet_Potato_41633_nr5iyy.jpg',
  ingredients: [
    { name: 'Lean steak', amount: '6', unit: 'oz' },
    { name: 'Brussels sprouts', amount: '1', unit: 'cup' },
    { name: 'Sweet potato', amount: '1', unit: 'small' }
  ],
  instructions: [
    { number: 1, instruction: 'Grill steak to preferred doneness' },
    { number: 2, instruction: 'Roast Brussels sprouts' },
    { number: 3, instruction: 'Bake or microwave sweet potato' }
  ]
},
{
  id: 'cod-spinach-greenbeans',
  title: 'Cod Fillet with Sautéed Spinach and Garlic Green Beans',
  prepTime: '18 min',
  servings: 1,
  calories: 300,
  protein: 34,
  carbs: 10,
  fat: 12,
  category: 'dinner',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761679480/Firefly_A_meal_of_Cod_Fillet_with_Saut%C3%A9ed_Spinach_and_Garlic_Green_Beans_41633_ytm7c0.jpg',
  ingredients: [
    { name: 'Cod fillet', amount: '5', unit: 'oz' },
    { name: 'Spinach', amount: '1', unit: 'cup' },
    { name: 'Green beans', amount: '1', unit: 'cup' },
    { name: 'Garlic', amount: '1', unit: 'clove, minced' }
  ],
  instructions: [
    { number: 1, instruction: 'Bake or pan-sear cod until flaky' },
    { number: 2, instruction: 'Sauté spinach and green beans with garlic' },
    { number: 3, instruction: 'Serve together warm' }
  ]
},
{
  id: 'chicken-stirfry-soy-ginger',
  title: 'Chicken Stir-Fry with Mixed Veggies and a Light Soy-Ginger Sauce',
  prepTime: '15 min',
  servings: 1,
  calories: 310,
  protein: 34,
  carbs: 16,
  fat: 12,
  category: 'dinner',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761679585/Firefly_A_meal_of_Chicken_Stir-Fry_with_Mixed_Veggies_and_a_Light_Soy-Ginger_Sauce_41633_xetofw.jpg',
  ingredients: [
    { name: 'Chicken breast', amount: '5', unit: 'oz' },
    { name: 'Mixed veggies', amount: '1.5', unit: 'cups' },
    { name: 'Soy sauce', amount: '1', unit: 'tbsp' },
    { name: 'Ginger', amount: '1', unit: 'tsp, grated' }
  ],
  instructions: [
    { number: 1, instruction: 'Cook chicken in a pan until browned' },
    { number: 2, instruction: 'Add veggies and stir-fry' },
    { number: 3, instruction: 'Stir in soy sauce and ginger before serving' }
  ]
},
{
  id: 'seared-tuna-cucumber-edamame',
  title: 'Seared Tuna Steak with Cucumber Salad and Edamame',
  prepTime: '15 min',
  servings: 1,
  calories: 320,
  protein: 36,
  carbs: 14,
  fat: 12,
  category: 'dinner',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761679650/Firefly_A_meal_of_Seared_Tuna_Steak_with_Cucumber_Salad_and_Edamame_41633_a1smvm.jpg',
  ingredients: [
    { name: 'Tuna steak', amount: '6', unit: 'oz' },
    { name: 'Cucumber', amount: '1/2', unit: 'cup, sliced' },
    { name: 'Edamame', amount: '1/2', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Sear tuna steak quickly on each side' },
    { number: 2, instruction: 'Toss cucumber into a light salad' },
    { number: 3, instruction: 'Serve with edamame' }
  ]
},
{
  id: 'turkey-lettuce-cups-veggies',
  title: 'Ground Turkey Lettuce Cups with Diced Veggies',
  prepTime: '12 min',
  servings: 1,
  calories: 280,
  protein: 28,
  carbs: 8,
  fat: 12,
  category: 'dinner',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761679733/Firefly_A_meal_of_Ground_Turkey_Lettuce_Cups_with_Diced_Veggies_41633_cbcgih.jpg',
  ingredients: [
    { name: 'Ground turkey', amount: '5', unit: 'oz' },
    { name: 'Romaine lettuce leaves', amount: '3', unit: 'large' },
    { name: 'Mixed veggies', amount: '1/2', unit: 'cup, diced' }
  ],
  instructions: [
    { number: 1, instruction: 'Cook ground turkey until browned' },
    { number: 2, instruction: 'Spoon turkey and veggies into lettuce leaves' },
    { number: 3, instruction: 'Serve as handheld cups' }
  ]
},
{
  id: 'lentil-vegetable-stew-carrots',
  title: 'Lentil & Vegetable Stew with a Side of Roasted Carrots',
  prepTime: '25 min',
  servings: 1,
  calories: 290,
  protein: 18,
  carbs: 38,
  fat: 6,
  category: 'dinner',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761679811/Firefly_A_meal_of_Lentil_Vegetable_Stew_with_a_Side_of_Roasted_Carrots_41633_mo4tsa.jpg',
  ingredients: [
    { name: 'Lentils', amount: '1', unit: 'cup, cooked' },
    { name: 'Mixed vegetables', amount: '1', unit: 'cup' },
    { name: 'Carrots', amount: '1', unit: 'cup, roasted' }
  ],
  instructions: [
    { number: 1, instruction: 'Simmer lentils with vegetables to make stew' },
    { number: 2, instruction: 'Roast carrots until tender' },
    { number: 3, instruction: 'Serve stew with carrots on the side' }
  ]
},
{
  id: 'greek-yogurt-cinnamon-berries',
  title: 'Greek Yogurt with Cinnamon and a Few Berries',
  prepTime: '5 min',
  servings: 1,
  calories: 160,
  protein: 15,
  carbs: 18,
  fat: 2,
  category: 'snack',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761680026/Firefly_A_meal_of_Greek_Yogurt_with_Cinnamon_and_a_Few_Berries_41633_kwt49z.jpg',
  ingredients: [
    { name: 'Non-fat Greek yogurt', amount: '3/4', unit: 'cup' },
    { name: 'Mixed berries', amount: '1/4', unit: 'cup' },
    { name: 'Cinnamon', amount: '1/4', unit: 'tsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Spoon yogurt into a bowl' },
    { number: 2, instruction: 'Top with berries and sprinkle cinnamon' }
  ]
},
{
  id: 'celery-peanutbutter',
  title: 'Celery Sticks with 2 Tbsp Natural Peanut Butter',
  prepTime: '3 min',
  servings: 1,
  calories: 190,
  protein: 8,
  carbs: 9,
  fat: 15,
  category: 'snack',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761680087/Firefly_A_meal_of_Celery_Sticks_with_2_Tbsp_Natural_Peanut_Butter_41633_jidxuu.jpg',
  ingredients: [
    { name: 'Celery sticks', amount: '4', unit: 'medium' },
    { name: 'Natural peanut butter', amount: '2', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Wash and cut celery sticks' },
    { number: 2, instruction: 'Spread peanut butter into celery grooves' }
  ]
},
{
  id: 'hardboiled-eggs-paprika',
  title: 'Hard-Boiled Eggs with a Sprinkle of Paprika',
  prepTime: '10 min',
  servings: 1,
  calories: 150,
  protein: 12,
  carbs: 1,
  fat: 10,
  category: 'snack',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761680191/Firefly_A_meal_of_Hard-Boiled_Eggs_with_a_Sprinkle_of_Paprika_41633_valdav.jpg',
  ingredients: [
    { name: 'Eggs', amount: '2', unit: 'large' },
    { name: 'Paprika', amount: '1/4', unit: 'tsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Boil eggs for 10 minutes and peel' },
    { number: 2, instruction: 'Slice in half and sprinkle with paprika' }
  ]
},
{
  id: 'cottage-cheese-cucumber',
  title: 'Cottage Cheese with Sliced Cucumber',
  prepTime: '3 min',
  servings: 1,
  calories: 140,
  protein: 16,
  carbs: 6,
  fat: 5,
  category: 'snack',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761680332/Firefly_A_meal_of_Cottage_Cheese_on_Sliced_Cucumber_41633_wokqxu.jpg',
  ingredients: [
    { name: 'Low-fat cottage cheese', amount: '1/2', unit: 'cup' },
    { name: 'Cucumber', amount: '1/2', unit: 'cup, sliced' }
  ],
  instructions: [
    { number: 1, instruction: 'Spoon cottage cheese into a bowl' },
    { number: 2, instruction: 'Top with cucumber slices' }
  ]
},
{
  id: 'protein-shake-almondmilk',
  title: 'Protein Shake (whey + unsweetened almond milk)',
  prepTime: '2 min',
  servings: 1,
  calories: 180,
  protein: 25,
  carbs: 5,
  fat: 6,
  category: 'snack',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761680411/Firefly_A_meal_of_Protein_Shake_whey_unsweetened_almond_milk_159750_pqf25y.jpg',
  ingredients: [
    { name: 'Whey protein powder', amount: '1', unit: 'scoop' },
    { name: 'Unsweetened almond milk', amount: '1', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Combine whey and almond milk in shaker' },
    { number: 2, instruction: 'Shake well until smooth' }
  ]
},
{
  id: 'turkey-chicken-spinach-rolls',
  title: 'Turkey or Chicken Slices Rolled with Spinach',
  prepTime: '3 min',
  servings: 1,
  calories: 120,
  protein: 18,
  carbs: 2,
  fat: 4,
  category: 'snack',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761680501/Firefly_A_meal_of_Turkey_or_Chicken_Slices_Rolled_with_Spinach_159750_javds3.jpg',
  ingredients: [
    { name: 'Deli turkey or chicken slices', amount: '3', unit: 'oz' },
    { name: 'Spinach leaves', amount: '1/2', unit: 'cup' }
  ],
  instructions: [
    { number: 1, instruction: 'Lay out deli slices' },
    { number: 2, instruction: 'Add spinach leaves and roll tightly' }
  ]
},
{
  id: 'ricecakes-hummus-tomatoes',
  title: 'Rice Cakes with Hummus and Cherry Tomatoes',
  prepTime: '5 min',
  servings: 1,
  calories: 160,
  protein: 6,
  carbs: 24,
  fat: 5,
  category: 'snack',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761680608/Firefly_A_meal_of_Rice_Cakes_with_Hummus_and_Cherry_Tomatoes_159750_hpomtu.jpg',
  ingredients: [
    { name: 'Rice cakes', amount: '2', unit: 'pieces' },
    { name: 'Hummus', amount: '2', unit: 'tbsp' },
    { name: 'Cherry tomatoes', amount: '1/2', unit: 'cup, halved' }
  ],
  instructions: [
    { number: 1, instruction: 'Spread hummus on rice cakes' },
    { number: 2, instruction: 'Top with halved cherry tomatoes' }
  ]
},
{
  id: 'edamame-seasalt',
  title: 'Edamame with Sea Salt',
  prepTime: '5 min',
  servings: 1,
  calories: 130,
  protein: 12,
  carbs: 10,
  fat: 5,
  category: 'snack',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761680688/Firefly_A_meal_of_Edamame_with_Sea_Salt_159750_pcaewc.jpg',
  ingredients: [
    { name: 'Edamame', amount: '1', unit: 'cup, steamed' },
    { name: 'Sea salt', amount: '1/4', unit: 'tsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Steam edamame' },
    { number: 2, instruction: 'Sprinkle with sea salt before serving' }
  ]
},
{
  id: 'apple-almondbutter',
  title: 'Apple Slices with 1 Tbsp Almond Butter',
  prepTime: '3 min',
  servings: 1,
  calories: 150,
  protein: 4,
  carbs: 22,
  fat: 7,
  category: 'snack',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761680757/Firefly_A_meal_of_Apple_Slices_with_1_Tbsp_Almond_Butter_159750_vcpcbl.jpg',
  ingredients: [
    { name: 'Apple', amount: '1', unit: 'medium, sliced' },
    { name: 'Almond butter', amount: '1', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Slice apple into wedges' },
    { number: 2, instruction: 'Serve with almond butter for dipping' }
  ]
},
{
  id: 'carrots-greekyogurt-dip',
  title: 'Baby Carrots with Low-Fat Ranch or Greek Yogurt Dip',
  prepTime: '2 min',
  servings: 1,
  calories: 110,
  protein: 5,
  carbs: 12,
  fat: 5,
  category: 'snack',
  tags: ['high-protein', 'cut'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761680832/Firefly_A_meal_of_Baby_Carrots_with_Low-Fat_Ranch_or_Greek_Yogurt_Dip_159750_ysbjec.jpg',
  ingredients: [
    { name: 'Baby carrots', amount: '1', unit: 'cup' },
    { name: 'Low-fat ranch or Greek yogurt dip', amount: '2', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Place baby carrots in a serving bowl' },
    { number: 2, instruction: 'Serve with dip on the side' }
  ]
},
  {
    id: 'cut-protein-smoothie',
    title: 'Low-Calorie Protein Smoothie',
    prepTime: '5 min',
    servings: 1,
    calories: 180,
    protein: 25,
    carbs: 12,
    fat: 3,
    category: 'snack',
    tags: ['high-protein', 'cut', 'low-calorie'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761680968/Firefly_A_meal_of_Low-Calorie_Protein_Smoothie_with_frozen_berries_341511_wpvqxp.jpg',
    ingredients: [
      { name: 'Protein powder', amount: '1', unit: 'scoop' },
      { name: 'Unsweetened almond milk', amount: '1', unit: 'cup' },
      { name: 'Frozen berries', amount: '1/2', unit: 'cup' },
      { name: 'Spinach', amount: '1', unit: 'handful' },
      { name: 'Ice', amount: '1/2', unit: 'cup' }
    ],
    instructions: [
      { number: 1, instruction: 'Add all ingredients to blender' },
      { number: 2, instruction: 'Blend until smooth' },
      { number: 3, instruction: 'Serve immediately' }
    ]
  },
  {
    id: 'cut-zucchini-noodles',
    title: 'Zucchini Noodles with Turkey',
    prepTime: '20 min',
    servings: 1,
    calories: 280,
    protein: 32,
    carbs: 12,
    fat: 12,
    category: 'dinner',
    tags: ['high-protein', 'cut', 'low-calorie', 'low-carb'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761681129/Firefly_A_meal_of_Noodles_with_Turkey_on_a_plate_341511_qfvumf.jpg',
    ingredients: [
      { name: 'Ground turkey', amount: '5', unit: 'oz' },
      { name: 'Zucchini', amount: '2', unit: 'medium' },
      { name: 'Marinara sauce', amount: '1/2', unit: 'cup' },
      { name: 'Olive oil', amount: '1', unit: 'tsp' },
      { name: 'Garlic', amount: '2', unit: 'cloves' },
      { name: 'Italian herbs', amount: '1', unit: 'tsp' }
    ],
    instructions: [
      { number: 1, instruction: 'Spiralize zucchini into noodles' },
      { number: 2, instruction: 'Cook ground turkey with garlic and herbs' },
      { number: 3, instruction: 'Add marinara sauce and simmer' },
      { number: 4, instruction: 'Sauté zucchini noodles for 2-3 minutes' },
      { number: 5, instruction: 'Serve turkey over zucchini noodles' }
    ]
  }
];

// Sample meals (including existing meals plus new low-calorie breakfast meals)
export const meals: Meal[] = [
  // Include all meal categories
  ...lowCalorieBreakfastMeals,
  ...additionalBulkMeals,
  ...cutMeals,
  // Original meals
  {
    id: 'overnight-oats-chia',
    title: 'Overnight Oats with Chia Seeds',
    prepTime: '5 min',
    servings: 1,
    calories: 180,
    protein: 5,
    carbs: 30,
    fat: 5,
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761681213/Firefly_A_meal_of_Overnight_Oats_with_Chia_Seeds_341511_sxofaf.jpg',
    category: 'breakfast',
    tags: ['breakfast', 'low-calorie', 'vegetarian'],
    allergens: ['nuts', 'honey'],
    ingredients: [
      { name: 'rolled oats', amount: '40', unit: 'g' },
      { name: 'chia seeds', amount: '1', unit: 'tbsp' },
      { name: 'unsweetened almond milk', amount: '150', unit: 'ml', allergens: ['nuts'] },
      { name: 'honey', amount: '1', unit: 'tsp', allergens: ['honey'] },
      { name: 'fresh berries', amount: '50', unit: 'g' }
    ],
    instructions: [
      { number: 1, instruction: 'Combine oats, chia seeds, and almond milk in a jar.' },
      { number: 2, instruction: 'Stir in honey, cover, and refrigerate overnight.' },
      { number: 3, instruction: 'Top with fresh berries before serving.' }
    ]
  },
  {
    id: 'greek-yogurt-nuts-honey',
    title: 'Greek Yogurt with Mixed Nuts and Honey',
    prepTime: '3 min',
    servings: 1,
    calories: 190,
    protein: 15,
    carbs: 12,
    fat: 10,
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761681279/Firefly_A_meal_of_Greek_Yogurt_with_Mixed_Nuts_and_Honey_341511_kihzwp.jpg',
    category: 'breakfast',
    tags: ['breakfast', 'low-calorie', 'vegetarian'],
    allergens: ['dairy', 'nuts', 'honey'],
    ingredients: [
      { name: 'fat-free Greek yogurt', amount: '150', unit: 'g', allergens: ['dairy'] },
      { name: 'mixed nuts', amount: '10', unit: 'g', allergens: ['nuts'] },
      { name: 'honey', amount: '1', unit: 'tsp', allergens: ['honey'] }
    ],
    instructions: [
      { number: 1, instruction: 'Spoon yogurt into a bowl.' },
      { number: 2, instruction: 'Sprinkle with mixed nuts and drizzle with honey.' }
    ]
  },
  {
    id: 'avocado-toast',
    title: 'Avocado Toast on Whole Wheat Bread',
    prepTime: '5 min',
    servings: 1,
    calories: 200,
    protein: 5,
    carbs: 20,
    fat: 12,
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761681357/Firefly_A_meal_of_Avocado_Toast_on_Whole_Wheat_Bread_341511_oqoefr.jpg',
    category: 'breakfast',
    tags: ['breakfast', 'low-calorie', 'vegan'],
    allergens: ['gluten'],
    ingredients: [
      { name: 'whole wheat bread', amount: '1', unit: 'slice', allergens: ['gluten'] },
      { name: 'ripe avocado', amount: '1/4', unit: 'whole' },
      { name: 'salt', amount: 'to taste', unit: '' },
      { name: 'pepper', amount: 'to taste', unit: '' }
    ],
    instructions: [
      { number: 1, instruction: 'Toast the bread.' },
      { number: 2, instruction: 'Mash the avocado and spread over the toast.' },
      { number: 3, instruction: 'Season with salt and pepper and serve.' }
    ]
  },
  {
    id: 'scrambled-eggs-spinach',
    title: 'Scrambled Eggs with Spinach',
    prepTime: '5 min',
    servings: 1,
    calories: 180,
    protein: 14,
    carbs: 2,
    fat: 12,
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761681420/Firefly_A_meal_of_Scrambled_Eggs_with_Spinach_341511_pprjna.jpg',
    category: 'breakfast',
    tags: ['breakfast', 'low-calorie', 'vegetarian'],
    allergens: ['eggs'],
    ingredients: [
      { name: 'eggs', amount: '2', unit: 'large', allergens: ['eggs'] },
      { name: 'fresh spinach', amount: '1', unit: 'handful' },
      { name: 'cooking spray', amount: '1', unit: 'spray' },
      { name: 'salt', amount: 'to taste', unit: '' },
      { name: 'pepper', amount: 'to taste', unit: '' }
    ],
    instructions: [
      { number: 1, instruction: 'Spray a pan with cooking spray and sauté spinach until wilted.' },
      { number: 2, instruction: 'Beat eggs, pour into the pan, and scramble until cooked through.' },
      { number: 3, instruction: 'Season with salt and pepper and serve.' }
    ]
  },
  {
    id: 'banana-spinach-smoothie',
    title: 'Smoothie with Banana and Spinach',
    prepTime: '3 min',
    servings: 1,
    calories: 150,
    protein: 3,
    carbs: 25,
    fat: 3,
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761681478/Firefly_A_meal_of_Smoothie_with_Banana_and_Spinach_341511_dbz14c.jpg',
    category: 'breakfast',
    tags: ['breakfast', 'low-calorie', 'vegan'],
    allergens: ['nuts'],
    ingredients: [
      { name: 'banana', amount: '1', unit: 'small' },
      { name: 'spinach', amount: '1', unit: 'handful' },
      { name: 'unsweetened almond milk', amount: '100', unit: 'ml', allergens: ['nuts'] },
      { name: 'ice cubes', amount: '3', unit: 'pieces' }
    ],
    instructions: [
      { number: 1, instruction: 'Blend all ingredients until smooth.' },
      { number: 2, instruction: 'Serve chilled.' }
    ]
  },
  {
    id: 'cottage-cheese-pineapple',
    title: 'Cottage Cheese with Pineapple',
    prepTime: '2 min',
    servings: 1,
    calories: 160,
    protein: 14,
    carbs: 10,
    fat: 5,
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761681540/Firefly_A_meal_of_Cottage_Cheese_with_Pineapple_341511_txeimd.jpg',
    category: 'breakfast',
    tags: ['breakfast', 'low-calorie', 'vegetarian'],
    allergens: ['dairy'],
    ingredients: [
      { name: 'low-fat cottage cheese', amount: '100', unit: 'g', allergens: ['dairy'] },
      { name: 'fresh pineapple', amount: '50', unit: 'g' }
    ],
    instructions: [
      { number: 1, instruction: 'Combine cottage cheese and pineapple in a bowl.' },
      { number: 2, instruction: 'Serve chilled.' }
    ]
  },
  {
    id: 'tomato-cucumber-feta-salad',
    title: 'Tomato and Cucumber Salad with Feta',
    prepTime: '5 min',
    servings: 1,
    calories: 200,
    protein: 8,
    carbs: 10,
    fat: 15,
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761681596/Firefly_A_meal_of_Tomato_and_Cucumber_Salad_with_Feta_341511_glmlow.jpg',
    category: 'breakfast',
    tags: ['breakfast', 'low-calorie', 'vegetarian'],
    allergens: ['dairy'],
    ingredients: [
      { name: 'tomato', amount: '1', unit: 'medium' },
      { name: 'cucumber', amount: '1/2', unit: 'medium' },
      { name: 'feta cheese', amount: '30', unit: 'g', allergens: ['dairy'] },
      { name: 'olive oil', amount: '1', unit: 'tsp' },
      { name: 'lemon juice', amount: '1', unit: 'tsp' },
      { name: 'salt', amount: 'to taste', unit: '' },
      { name: 'pepper', amount: 'to taste', unit: '' }
    ],
    instructions: [
      { number: 1, instruction: 'Chop tomato and cucumber and combine in a bowl.' },
      { number: 2, instruction: 'Add crumbled feta, olive oil, lemon juice, salt, and pepper.' },
      { number: 3, instruction: 'Toss and serve.' }
    ]
  },
  {
    id: 'chia-pudding-almond-milk',
    title: 'Chia Pudding with Almond Milk',
    prepTime: '5 min + refrigerate',
    servings: 1,
    calories: 190,
    protein: 5,
    carbs: 18,
    fat: 9,
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761681674/Firefly_A_meal_of_Chia_Pudding_with_Almond_Milk_341511_giolds.jpg',
    category: 'breakfast',
    tags: ['breakfast', 'low-calorie', 'vegan'],
    allergens: ['nuts'],
    ingredients: [
      { name: 'chia seeds', amount: '2', unit: 'tbsp' },
      { name: 'unsweetened almond milk', amount: '200', unit: 'ml', allergens: ['nuts'] },
      { name: 'vanilla extract', amount: '1', unit: 'tsp' },
      { name: 'sweetener', amount: 'to taste', unit: '' }
    ],
    instructions: [
      { number: 1, instruction: 'Mix chia seeds, almond milk, vanilla, and sweetener in a bowl.' },
      { number: 2, instruction: 'Refrigerate for at least 2 hours or overnight until thickened.' },
      { number: 3, instruction: 'Serve chilled.' }
    ]
  },
  {
    id: 'boiled-eggs-cherry-tomatoes',
    title: 'Boiled Eggs with Cherry Tomatoes',
    prepTime: '7 min',
    servings: 1,
    calories: 170,
    protein: 14,
    carbs: 3,
    fat: 11,
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761681730/Firefly_A_meal_of_Boiled_Eggs_with_Cherry_Tomatoes_341511_g9y7qv.jpg',
    category: 'breakfast',
    tags: ['breakfast', 'low-calorie', 'vegetarian'],
    allergens: ['eggs'],
    ingredients: [
      { name: 'eggs', amount: '2', unit: 'large', allergens: ['eggs'] },
      { name: 'cherry tomatoes', amount: '50', unit: 'g' },
      { name: 'salt', amount: 'to taste', unit: '' },
      { name: 'pepper', amount: 'to taste', unit: '' }
    ],
    instructions: [
      { number: 1, instruction: 'Boil eggs to desired doneness.' },
      { number: 2, instruction: 'Serve with halved cherry tomatoes.' },
      { number: 3, instruction: 'Season with salt and pepper.' }
    ]
  },
  {
    id: 'healthy-banana-muffins',
    title: 'Healthy Banana Muffins',
    prepTime: '15 min',
    servings: 6,
    calories: 206,
    protein: 4.5,
    carbs: 30,
    fat: 7.5,
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761681837/Firefly_A_meal_of_Healthy_Banana_Muffins_341511_rz7fxw.jpg',
    category: 'breakfast',
    tags: ['breakfast', 'low-calorie', 'vegetarian'],
    allergens: ['gluten', 'dairy', 'eggs'],
    ingredients: [
      { name: 'wholemeal flour', amount: '125', unit: 'g', allergens: ['gluten'] },
      { name: 'light muscovado sugar', amount: '3', unit: 'tbsp' },
      { name: 'baking powder', amount: '2', unit: 'tsp' },
      { name: 'free-range egg', amount: '1', unit: 'medium', allergens: ['eggs'] },
      { name: 'low-fat plain yoghurt', amount: '50', unit: 'g', allergens: ['dairy'] },
      { name: 'rapeseed oil', amount: '50', unit: 'ml' },
      { name: 'ripe bananas', amount: '2', unit: 'whole' }
    ],
    instructions: [
      { number: 1, instruction: 'Preheat the oven to 200°C/180°C Fan/Gas 6. Line a six-hole muffin tin with muffin cases or grease it.' },
      { number: 2, instruction: 'Mix together the flour, sugar, and baking powder in a bowl.' },
      { number: 3, instruction: 'In a separate bowl, beat together the egg, yoghurt, and oil.' },
      { number: 4, instruction: 'Make a well in the flour mixture, pour in the wet ingredients, and mix well.' },
      { number: 5, instruction: 'Stir in the mashed bananas, taking care not to over-mix.' },
      { number: 6, instruction: 'Spoon the mixture into the prepared cases and bake for 20–30 minutes, or until a skewer inserted into the centre comes out clean.' },
      { number: 7, instruction: 'Transfer the muffins to a wire rack to cool.' }
    ]
  },
  {
  id: 'creamy-mushrooms-on-toast',
  title: 'Creamy Mushrooms on Toast',
  prepTime: '5 min',
  servings: 1,
  calories: 187,
  protein: 13,
  carbs: 17,
  fat: 6,
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761681903/Firefly_A_meal_of_Creamy_Mushrooms_on_ToastHealthy_Banana_Muffins_341511_peybs6.jpg',
  category: 'breakfast',
  tags: ['breakfast', 'low-calorie', 'vegetarian'],
  allergens: ['dairy', 'gluten'],
  ingredients: [
    { name: 'wholemeal bread', amount: '1', unit: 'slice', allergens: ['gluten'] },
    { name: 'light cream cheese', amount: '1.5', unit: 'tbsp', allergens: ['dairy'] },
    { name: 'rapeseed oil', amount: '1', unit: 'tsp' },
    { name: 'mushrooms', amount: '3', unit: 'handfuls' },
    { name: 'skimmed milk', amount: '2', unit: 'tbsp', allergens: ['dairy'] },
    { name: 'wholegrain mustard', amount: '0.25', unit: 'tsp' },
    { name: 'chives', amount: '1', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Toast the bread.' },
    { number: 2, instruction: 'Heat oil in a pan and fry the mushrooms until softened.' },
    { number: 3, instruction: 'Stir in mustard, milk and cream cheese until creamy.' },
    { number: 4, instruction: 'Spoon over toast and scatter with chives.' }
  ]
},

{
  id: 'lighter-baked-mushrooms',
  title: 'Lighter Baked Mushrooms',
  prepTime: '5 min',
  servings: 2,
  calories: 120,
  protein: 4,
  carbs: 7,
  fat: 8,
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761681980/Firefly_A_meal_of_Lighter_Baked_Mushrooms_341511_yxkc2v.jpg',
  category: 'breakfast',
  tags: ['breakfast', 'low-calorie', 'vegan'],
  allergens: [],
  ingredients: [
    { name: 'mushrooms', amount: '400', unit: 'g' },
    { name: 'garlic', amount: '2', unit: 'cloves' },
    { name: 'fresh rosemary', amount: '1', unit: 'tsp' },
    { name: 'olive oil', amount: '1', unit: 'tbsp' },
    { name: 'balsamic vinegar', amount: '1', unit: 'tsp' },
    { name: 'parsley', amount: '1', unit: 'tbsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Heat oven to 200°C/180°C fan/Gas 6.' },
    { number: 2, instruction: 'Arrange mushrooms in a single layer in a roasting tray.' },
    { number: 3, instruction: 'Mix garlic, rosemary, olive oil, vinegar and seasoning; toss mushrooms.' },
    { number: 4, instruction: 'Roast for 10–15 mins until tender and scatter with parsley.' }
  ]
},

{
  id: 'baked-egg-with-ham-and-spinach',
  title: 'Baked Egg with Ham & Spinach',
  prepTime: '10 min',
  servings: 1,
  calories: 260,
  protein: 22,
  carbs: 10,
  fat: 15,
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761682047/Firefly_A_meal_of_Baked_Egg_with_Ham_Spinach_341511_vmr6nv.jpg',
  category: 'breakfast',
  tags: ['breakfast', 'low-calorie'],
  allergens: ['eggs', 'gluten'],
  ingredients: [
    { name: 'egg', amount: '2', unit: 'medium', allergens: ['eggs'] },
    { name: 'ham', amount: '2', unit: 'slices' },
    { name: 'onion', amount: '0.5', unit: 'whole' },
    { name: 'garlic', amount: '1', unit: 'clove' },
    { name: 'red chilli', amount: '0.5', unit: 'whole' },
    { name: 'chopped tomatoes', amount: '200', unit: 'g' },
    { name: 'red pepper', amount: '0.5', unit: 'whole' },
    { name: 'spinach', amount: '1', unit: 'handful' },
    { name: 'olive oil', amount: '1', unit: 'tsp' }
  ],
  instructions: [
    { number: 1, instruction: 'Heat oven to 180°C/160°C fan/Gas 4 and cook onion, garlic and chilli.' },
    { number: 2, instruction: 'Stir in tomatoes, water, peppers and ham; simmer until thickened.' },
    { number: 3, instruction: 'Add spinach to wilt.' },
    { number: 4, instruction: 'Make two hollows, crack in eggs, sprinkle cayenne, and bake 10 mins.' },
    { number: 5, instruction: 'Serve with crusty bread.' }
  ]
},

{
  id: 'berry-yoghurt',
  title: 'Berry Yoghurt',
  prepTime: '2 min',
  servings: 2,
  calories: 310,
  protein: 25,
  carbs: 30,
  fat: 9,
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761682106/Firefly_A_meal_of_Berry_Yoghurt_341511_dcolwm.jpg',
  category: 'breakfast',
  tags: ['breakfast', 'low-calorie', 'vegetarian'],
  allergens: ['dairy', 'nuts'],
  ingredients: [
    { name: 'frozen mixed berries', amount: '175', unit: 'g' },
    { name: 'fat-free Greek yoghurt', amount: '340', unit: 'g', allergens: ['dairy'] },
    { name: 'flaked almonds', amount: '10', unit: 'g', allergens: ['nuts'] }
  ],
  instructions: [
    { number: 1, instruction: 'Spoon yoghurt into two glasses, layer with berries.' },
    { number: 2, instruction: 'Sprinkle with flaked almonds and serve.' }
  ]
},

{
  id: 'crunchy-banana-yoghurt',
  title: 'Crunchy Banana Yoghurt',
  prepTime: '2 min',
  servings: 2,
  calories: 370,
  protein: 21,
  carbs: 45,
  fat: 11,
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761682170/Firefly_A_meal_of_Crunchy_Banana_Yoghurt_341511_kompo2.jpg',
  category: 'breakfast',
  tags: ['breakfast', 'low-calorie', 'vegetarian'],
  allergens: ['dairy', 'nuts'],
  ingredients: [
    { name: 'fat-free natural Greek-style yoghurt', amount: '340', unit: 'g', allergens: ['dairy'] },
    { name: 'banana', amount: '1', unit: 'whole' },
    { name: 'mixed seeds or toasted flaked almonds', amount: '15', unit: 'g', allergens: ['nuts'] }
  ],
  instructions: [
    { number: 1, instruction: 'Divide yoghurt between bowls and top with sliced banana.' },
    { number: 2, instruction: 'Sprinkle with seeds or nuts and serve.' }
  ]
},

{
  id: 'boiled-egg-with-rye',
  title: 'Boiled Egg with Rye Soldiers',
  prepTime: '7 min',
  servings: 1,
  calories: 340,
  protein: 20,
  carbs: 26,
  fat: 15,
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761682227/Firefly_A_meal_of_Boiled_Egg_with_Rye_Soldiers_341511_p64zzs.jpg',
  category: 'breakfast',
  tags: ['breakfast', 'low-calorie', 'vegetarian'],
  allergens: ['gluten', 'dairy', 'eggs'],
  ingredients: [
    { name: 'eggs', amount: '2', unit: 'medium', allergens: ['eggs'] },
    { name: 'dark rye bread', amount: '2', unit: 'slices', allergens: ['gluten'] },
    { name: 'unsalted butter', amount: '5', unit: 'g', allergens: ['dairy'] },
    { name: 'sea salt', amount: 'to taste', unit: '' },
    { name: 'black pepper', amount: 'to taste', unit: '' }
  ],
  instructions: [
    { number: 1, instruction: 'Boil eggs to desired doneness.' },
    { number: 2, instruction: 'Toast rye bread and spread with butter to make soldiers.' },
    { number: 3, instruction: 'Serve sliced eggs with bread soldiers, season with salt and pepper.' }
  ]
}
];

const bulkMeals: Meal[] = [
  {
    id: 'bulk-protein-pancakes',
    title: 'High-Protein Pancakes',
    prepTime: '15 min',
    servings: 2,
    calories: 650,
    protein: 45,
    carbs: 55,
    fat: 22,
    category: 'breakfast',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761682298/Firefly_A_meal_of_High-Protein_Pancakes_341511_huftlq.jpg',
    ingredients: [
      { name: 'Protein powder', amount: '2', unit: 'scoops' },
      { name: 'Oats', amount: '1', unit: 'cup' },
      { name: 'Banana', amount: '2', unit: 'large' },
      { name: 'Eggs', amount: '3', unit: 'whole' },
      { name: 'Peanut butter', amount: '2', unit: 'tbsp' },
      { name: 'Milk', amount: '1/2', unit: 'cup' }
    ],
    instructions: [
      { number: 1, instruction: 'Blend all ingredients until smooth' },
      { number: 2, instruction: 'Heat pan over medium heat' },
      { number: 3, instruction: 'Pour batter to form pancakes' },
      { number: 4, instruction: 'Cook 2-3 minutes per side until golden' },
      { number: 5, instruction: 'Serve with additional peanut butter' }
    ]
  },
  {
    id: 'bulk-steak-rice',
    title: 'Steak and Rice Power Bowl',
    prepTime: '25 min',
    servings: 1,
    calories: 780,
    protein: 52,
    carbs: 68,
    fat: 28,
    category: 'dinner',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761682431/Firefly_A_meal_of_Steak_and_Rice_Power_Bowl_341511_ubis73.jpg',
    ingredients: [
      { name: 'Sirloin steak', amount: '8', unit: 'oz' },
      { name: 'Brown rice', amount: '1.5', unit: 'cups cooked' },
      { name: 'Broccoli', amount: '1', unit: 'cup' },
      { name: 'Olive oil', amount: '1', unit: 'tbsp' },
      { name: 'Sweet potato', amount: '1', unit: 'medium' },
      { name: 'Butter', amount: '1', unit: 'tbsp' }
    ],
    instructions: [
      { number: 1, instruction: 'Season and grill steak to desired doneness' },
      { number: 2, instruction: 'Roast sweet potato at 400°F for 25 minutes' },
      { number: 3, instruction: 'Steam broccoli until tender' },
      { number: 4, instruction: 'Serve steak over rice with vegetables' },
      { number: 5, instruction: 'Drizzle with olive oil and add butter to sweet potato' }
    ]
  },
  {
    id: 'bulk-pasta-meatballs',
    title: 'Protein-Packed Pasta & Meatballs',
    prepTime: '30 min',
    servings: 2,
    calories: 720,
    protein: 48,
    carbs: 72,
    fat: 24,
    category: 'dinner',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761682505/Firefly_A_meal_of_Protein-Packed_Pasta_Meatballs_341511_aiymqw.jpg',
    ingredients: [
      { name: 'Whole wheat pasta', amount: '3', unit: 'cups cooked' },
      { name: 'Ground turkey', amount: '8', unit: 'oz' },
      { name: 'Marinara sauce', amount: '1', unit: 'cup' },
      { name: 'Mozzarella cheese', amount: '1/2', unit: 'cup' },
      { name: 'Olive oil', amount: '1', unit: 'tbsp' },
      { name: 'Parmesan cheese', amount: '2', unit: 'tbsp' }
    ],
    instructions: [
      { number: 1, instruction: 'Form turkey into meatballs and bake at 375°F for 20 minutes' },
      { number: 2, instruction: 'Cook pasta according to package directions' },
      { number: 3, instruction: 'Heat marinara sauce and add meatballs' },
      { number: 4, instruction: 'Combine pasta with sauce and meatballs' },
      { number: 5, instruction: 'Top with mozzarella and parmesan cheese' }
    ]
  },
  {
    id: 'bulk-smoothie-bowl',
    title: 'Mass Gainer Smoothie Bowl',
    prepTime: '10 min',
    servings: 1,
    calories: 580,
    protein: 38,
    carbs: 62,
    fat: 18,
    category: 'breakfast',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761682566/Firefly_A_meal_of_Mass_Gainer_Smoothie_Bowl_341511_jltjqe.jpg',
    ingredients: [
      { name: 'Protein powder', amount: '2', unit: 'scoops' },
      { name: 'Banana', amount: '2', unit: 'large' },
      { name: 'Oats', amount: '1/2', unit: 'cup' },
      { name: 'Almond butter', amount: '2', unit: 'tbsp' },
      { name: 'Milk', amount: '1', unit: 'cup' },
      { name: 'Granola', amount: '1/4', unit: 'cup' },
      { name: 'Mixed berries', amount: '1/2', unit: 'cup' }
    ],
    instructions: [
      { number: 1, instruction: 'Blend protein powder, banana, oats, almond butter and milk' },
      { number: 2, instruction: 'Pour into bowl' },
      { number: 3, instruction: 'Top with granola and berries' },
      { number: 4, instruction: 'Add extra almond butter if desired' }
    ]
  },
  {
    id: 'bulk-chicken-rice',
    title: 'Chicken & Rice Power Meal',
    prepTime: '20 min',
    servings: 1,
    calories: 690,
    protein: 46,
    carbs: 78,
    fat: 16,
    category: 'lunch',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761682675/Firefly_A_meal_of_Chicken_Rice_Power_Meal_with_avocado_and_black_beans_341511_qouo5l.jpg',
    ingredients: [
      { name: 'Chicken breast', amount: '8', unit: 'oz' },
      { name: 'Jasmine rice', amount: '1.5', unit: 'cups cooked' },
      { name: 'Black beans', amount: '1/2', unit: 'cup' },
      { name: 'Avocado', amount: '1/2', unit: 'medium' },
      { name: 'Olive oil', amount: '1', unit: 'tbsp' },
      { name: 'Corn', amount: '1/2', unit: 'cup' }
    ],
    instructions: [
      { number: 1, instruction: 'Season and grill chicken breast' },
      { number: 2, instruction: 'Cook rice according to package directions' },
      { number: 3, instruction: 'Warm black beans and corn' },
      { number: 4, instruction: 'Slice chicken and arrange over rice' },
      { number: 5, instruction: 'Top with beans, corn, and avocado' }
    ]
  },
  {
    id: 'bulk-salmon-quinoa',
    title: 'Salmon Quinoa Power Bowl',
    prepTime: '25 min',
    servings: 1,
    calories: 620,
    protein: 42,
    carbs: 48,
    fat: 26,
    category: 'dinner',
    tags: ['high-protein', 'bulk'],
    imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761682756/Firefly_A_meal_of_Salmon_Quinoa_Power_Bowl_341511_fjop77.jpg',
    ingredients: [
      { name: 'Salmon fillet', amount: '7', unit: 'oz' },
      { name: 'Quinoa', amount: '1', unit: 'cup cooked' },
      { name: 'Sweet potato', amount: '1', unit: 'medium roasted' },
      { name: 'Spinach', amount: '2', unit: 'cups' },
      { name: 'Olive oil', amount: '1', unit: 'tbsp' },
      { name: 'Almonds', amount: '1', unit: 'oz' }
    ],
    instructions: [
      { number: 1, instruction: 'Bake salmon at 400°F for 15 minutes' },
      { number: 2, instruction: 'Cook quinoa according to package directions' },
      { number: 3, instruction: 'Roast sweet potato until tender' },
      { number: 4, instruction: 'Sauté spinach with olive oil' },
      { number: 5, instruction: 'Combine all ingredients and top with almonds' }
    ]
  }
];

// Sample exercise library
export const exerciseLibrary = {
  exercises: [
{
  id: 'decline-push-ups',
  name: 'Decline Push Ups',
  category: 'chest',
  subCategory: 'upper',
  difficulty: 'intermediate',
  equipment: ['bench', 'elevated surface'],
  muscles: ['chest', 'front delts', 'triceps'],
  imageUrl: 'https://images.pexels.com/photos/6972651/pexels-photo-6972651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Kneel in front of the elevated surface, facing away',
    'Walk your hand away, shoulder width apart, until your body forms a straight line',
    'Lower your chest towards the ground by bending the elbows',
    'Press through your palms to straighten your arms, returning to the start'
  ],
  tips: [
    'Keep elbows slightly bent to deter locking out',
    'The higher the surface, the more challenging',
    'Maintain a straight body'
  ],
  commonMistakes: [
    'Arching of the back',
    'Arms too close together',
    'Locking of the elbows'
  ],
  variations: [
    'Standard press up',
    'Incline press up',
    'Diamond press up'
  ]
},  

{
  id: 'incline-barbell-press',
  name: 'Incline Barbell Press',
  category: 'chest',
  subCategory: 'upper',
  difficulty: 'intermediate',
  equipment: ['bench', 'barbell'],
  muscles: ['chest', 'front delts', 'triceps'],
  imageUrl: 'https://images.pexels.com/photos/13967665/pexels-photo-13967665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Adjust bench to an incline of about 30 – 45 degrees',
    'Set height of barbell rack so that elbows are just wider than 90 degrees',
    'Lie back on bench and grab the bar, slightly wider than shoulder width',
    'Feet flat, brace core and lift the bar off the rack',
    'Lower bar to upper chest, slightly below the neck, slow and controlled',
    'Push bar up, without locking elbows'
  ],
  tips: [
    'Keep wrists and elbows aligned throughout',
    'Keep elbows slightly tucked in',
    'Control the weight, do not bounce off your chest'
  ],
  commonMistakes: [
    'Letting weight fall too quickly',
    'Arching of the back',
    'Hands too close together',
    'Removing feet from floor'
  ],
  variations: [
    'Incline dumbbell press',
    'Flat barbell press',
    'incline bench cable press'
  ]
},  

{
  id: 'incline-dumbbell-flys',
  name: 'Incline Dumbbell Flys',
  category: 'chest',
  subCategory: 'upper',
  difficulty: 'intermediate',
  equipment: ['bench', 'dumbbells'],
  muscles: ['chest', 'front delts', 'triceps'],
  imageUrl: 'https://images.pexels.com/photos/11433027/pexels-photo-11433027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Adjust bench to an incline of about 30 – 45 degrees',
    'Pick up dumbbells and safely place on knees while sitting down',
    'Brace core, lie back and bring dumbbells together, palms facing inwards',
    'With feet flat, push the dumbbells up, without locking elbows',
    'With elbows slightly bent, pull the dumbbells apart, in a hug motion',
    'Slowly, keep pulling the dumbbells apart until you feel tension on the chest',
    'Bring the dumbbells together, without touching them together, squeezing the chest'
  ],
  tips: [
    'Keep feet planted for stability',
    'Keep elbows slightly bent',
    'Do not let the dumbbells touch when bringing together'
  ],
  commonMistakes: [
    'Bringing dumbbells too far apart',
    'Arching of the back',
    'Hitting dumbbells together',
    'Removing feet from floor'
  ],
  variations: [
    'Incline cable fly',
    'Incline bench cable fly'
  ]
},  

{
  id: 'incline-dumbbell-press',
  name: 'Incline Dumbbell Press',
  category: 'chest',
  subCategory: 'upper',
  difficulty: 'intermediate',
  equipment: ['bench', 'dumbbells'],
  muscles: ['chest', 'front delts', 'triceps'],
  imageUrl: 'https://images.pexels.com/photos/29526383/pexels-photo-29526383/free-photo-of-man-lifting-dumbbells-on-an-incline-bench-in-gym.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Adjust bench to an incline of about 30 – 45 degrees',
    'Pick up dumbbells and safely place on knees while sitting down',
    'Brace core, lie back and use your knees, one by one, to help bring the dumbbells up so that your elbows are set at 90 degrees',
    'With feet flat, push the dumbbells up, without locking elbows',
    'Slowly bring the dumbbells back down so that elbows again reach 90 degrees'
  ],
  tips: [
    'Keep feet planted for stability',
    'Keep elbows slightly bent when pushing up',
    'Tuck elbows slightly for a more targeted rep'
  ],
  commonMistakes: [
    'Bringing dumbbells too far apart',
    'Arching of the back',
    'Hitting dumbbells together'
  ],
  variations: [
    'Incline cable press',
    'Incline barbell press'
  ]
},  

{
  id: 'lower-cable-flys',
  name: 'Lower Cable Flys',
  category: 'chest',
  subCategory: 'upper',
  difficulty: 'intermediate',
  equipment: ['cable machine'],
  muscles: ['chest', 'front delts', 'triceps'],
  imageUrl: 'https://images.pexels.com/photos/20556237/pexels-photo-20556237/free-photo-of-man-exercising-at-gym.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Adjust height of cables on both sides to the lower numbers 0-2',
    'Attach a handle attachment to both cables',
    'Brace core, grab both handles and step forward until arms are pulled back slightly',
    'Place one foot in front of the other, knee slightly bent, push chest out and turn palms to the sky',
    'Bring hands together, in line with your chest, maintaining a slight elbow bend',
    'Slowly bring your hands apart, maintaining slight elbow bend, reaching the start position'
  ],
  tips: [
    'Keep feet planted for stability',
    'Keep elbows slightly bent when bringing arms across',
    'Push chest out for more of a targeted rep'
  ],
  commonMistakes: [
    'Letting elbows bend too much',
    'Not stepping far enough forward to feel the stretch',
    'Having the height of cable too high'
  ],
  variations: [
    'Incline dumbbell flys',
    'Incline bench cable flys'
  ]
},  

{
  id: 'incline-bench-cable-flys',
  name: 'Incline Bench Cable Flys',
  category: 'chest',
  subCategory: 'upper',
  difficulty: 'intermediate',
  equipment: ['cable machine'],
  muscles: ['chest', 'front delts', 'triceps'],
  imageUrl: 'https://images.pexels.com/photos/5327503/pexels-photo-5327503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Adjust height of cables on both sides to the lower numbers 0-2',
    'Attach a handle attachment to both cables',
    'Adjust bench to an incline of about 30 – 45 degrees',
    'Brace core, grab both handles and lean back on bench',
    'With elbows slightly bent and palms facing together, pull the cables together across your chest',
    'Maintain a squeeze of the chest and then slowly let the cable pull the handles apart, keeping elbows slightly bent'
  ],
  tips: [
    'Keep feet planted for stability',
    'Keep elbows slightly bent when bringing arms across',
    'Push chest out for more of a targeted rep'
  ],
  commonMistakes: [
    'Letting elbows bend too much',
    'Letting cables pull back too quickly',
    'Having the height of cable too high'
  ],
  variations: [
    'Incline dumbbell flys',
    'Incline cable flys'
  ]
},  

{
  id: 'push-ups',
  name: 'Push Ups',
  category: 'chest',
  subCategory: 'middle',
  difficulty: 'intermediate',
  equipment: ['nothing'],
  muscles: ['chest', 'side delts', 'triceps'],
  imageUrl: 'https://images.pexels.com/photos/8846278/pexels-photo-8846278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Kneel down on the floor',
    'Walk your hand away, shoulder width apart, until your back forms a straight line',
    'Now walk your legs back until your entire body forms a straight line',
    'Slowly bend your elbows to lower your chest close to the floor',
    'Press through your palms to straighten your arms, without locking the elbows'
  ],
  tips: [
    'Keep elbows slightly bent finishing pushing up',
    'Brace core to maintain straight back',
    'Have hands directly straight to deter any pain on wrist'
  ],
  commonMistakes: [
    'Arching of the back',
    'Do not lower their entire body',
    'Locking of the elbows'
  ],
  variations: [
    'Incline press up',
    'Decline press up',
    'Wide press up'
  ]
},  

{
  id: 'dumbbell-chest-press',
  name: 'Dumbbell Chest Press',
  category: 'chest',
  subCategory: 'middle',
  difficulty: 'intermediate',
  equipment: ['bench', 'dumbbells'],
  muscles: ['chest', 'side delts', 'triceps'],
  imageUrl: 'https://images.pexels.com/photos/7187890/pexels-photo-7187890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Pick up dumbbells and safely place on knees while sitting down',
    'Brace core, lie back and use your knees, one by one, to help bring the dumbbells up so that your elbows are set at 90 degrees',
    'With feet flat, push the dumbbells up, without locking elbows',
    'Slowly bring the dumbbells back down so that elbows again reach 90 degrees'
  ],
  tips: [
    'Keep feet planted for stability',
    'Keep elbows slightly bent when pushing up',
    'Tuck elbows slightly for a more targeted rep'
  ],
  commonMistakes: [
    'Bringing dumbbells too far apart',
    'Arching of the back',
    'Hitting dumbbells together'
  ],
  variations: [
    'Cable chest press',
    'Barbell chest press'
  ]
},  
{
  id: 'barbell-chest-press',
  name: 'Barbell Chest Press',
  category: 'chest',
  subCategory: 'middle',
  difficulty: 'intermediate',
  equipment: ['bench', 'barbell'],
  muscles: ['chest', 'side delts', 'triceps'],
  imageUrl: 'https://images.pexels.com/photos/4944953/pexels-photo-4944953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Adjust bench to flat at 180 degrees',
    'Set height of barbell rack so that elbows are just wider than 90 degrees',
    'Lie back on bench and grab the bar, slightly wider than shoulder width',
    'Feet flat, brace core and lift the bar off the rack',
    'Lower bar to middle chest, slow and controlled',
    'Push bar up, without locking elbows'
  ],
  tips: [
    'Keep wrists and elbows aligned throughout',
    'Keep elbows slightly tucked in',
    'Control the weight, do not bounce off your chest'
  ],
  commonMistakes: [
    'Letting weight fall too quickly',
    'Arching of the back',
    'Hands too close together',
    'Removing feet from floor'
  ],
  variations: [
    'Dumbbell chest press',
    'Cable chest press'
  ]
},  

{
  id: 'flat-dumbbell-flys',
  name: 'Flat Dumbbell Flys',
  category: 'chest',
  subCategory: 'middle',
  difficulty: 'intermediate',
  equipment: ['bench', 'dumbbells'],
  muscles: ['chest', 'front delts', 'triceps'],
  imageUrl: 'https://images.pexels.com/photos/11433027/pexels-photo-11433027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Adjust bench to flat at 180 degrees',
    'Pick up dumbbells and safely place on knees while sitting down',
    'Brace core, lie back and bring dumbbells together, palms facing inwards',
    'With feet flat, push the dumbbells up, without locking elbows',
    'With elbows slightly bent, pull the dumbbells apart, in a hug motion',
    'Slowly, keep pulling the dumbbells apart until you feel tension on the chest',
    'Bring the dumbbells together, without touching them together, squeezing the chest'
  ],
  tips: [
    'Keep feet planted for stability',
    'Keep elbows slightly bent',
    'Do not let the dumbbells touch when bringing together'
  ],
  commonMistakes: [
    'Bringing dumbbells too far apart',
    'Arching of the back',
    'Hitting dumbbells together',
    'Removing feet from floor'
  ],
  variations: [
    'Cable fly',
    'Bench cable fly'
  ]
},  

{
  id: 'hex-press',
  name: 'Hex Press',
  category: 'chest',
  subCategory: 'middle',
  difficulty: 'intermediate',
  equipment: ['bench', 'dumbbells'],
  muscles: ['chest', 'triceps'],
  imageUrl: 'https://images.pexels.com/photos/11433059/pexels-photo-11433059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Adjust bench to flat at 180 degrees',
    'Pick up dumbbells and safely place on knees while sitting down',
    'Brace core, lie back and use your knees, one by one, to help bring the dumbbells together just above your chest',
    'With feet flat, push the dumbbells up, without locking elbows while keeping them together',
    'Slowly bring the dumbbells back down by bending at the elbows, without the dumbbells touching your chest'
  ],
  tips: [
    'Keep feet planted for stability',
    'Push with chest while using elbows',
    'Tuck elbows slightly for a more targeted rep'
  ],
  commonMistakes: [
    'Bringing dumbbells too far apart',
    'Arching of the back',
    'Letting dumbbells hit the chest'
  ],
  variations: [
    'Dumbbell chest press',
    'Diamond push ups'
  ]
},  

{
  id: 'middle-cable-flys',
  name: 'Middle Cable Flys',
  category: 'chest',
  subCategory: 'middle',
  difficulty: 'intermediate',
  equipment: ['cable machine'],
  muscles: ['chest', 'triceps'],
  imageUrl: 'https://images.pexels.com/photos/5769127/pexels-photo-5769127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Adjust height of cables on both sides to the mid-high numbers',
    'Attach a handle attachment to both cables',
    'Brace core, grab both handles and step forward until arms are pulled back slightly',
    'Place one foot in front of the other, knee slightly bent, push chest out and turn palms to the sky',
    'Bring hands together, in line with your chest, maintaining a slight elbow bend',
    'Slowly bring your hands apart, maintaining slight elbow bend, reaching the start position'
  ],
  tips: [
    'Keep feet planted for stability',
    'Keep elbows slightly bent when bringing arms across',
    'Push chest out for more of a targeted rep'
  ],
  commonMistakes: [
    'Letting elbows bend too much',
    'Not stepping far enough forward to feel the stretch',
    'Having the height of cable too high'
  ],
  variations: [
    'Dumbbell flys',
    'Bench cable flys'
  ]
},  

{
  id: 'plate-press',
  name: 'Plate Press',
  category: 'chest',
  subCategory: 'middle',
  difficulty: 'intermediate',
  equipment: ['weighted plate', 'bench'],
  muscles: ['chest', 'triceps'],
  imageUrl: 'https://images.pexels.com/photos/4164450/pexels-photo-4164450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Choose a moderate-weight plate (e.g., 10–25 lbs to start)',
    'Hold it with both hands, palms facing each other, fingers wrapped around the edges',
    'Lie flat on a bench and hold the plate in front of your chest',
    'While squeezing the plate, slowly press it straight out in front of you towards the sky',
    'Slowly bring the plate back toward your chest, keeping the squeeze'
  ],
  tips: [
    'Keep feet planted for stability',
    'Do not lock elbows when extending',
    'Push chest out for more of a targeted rep'
  ],
  commonMistakes: [
    'Letting plate hit chest',
    'Locking elbows at the extension',
    'Picking up a plate that is too heavy'
  ],
  variations: [
    'Hex press',
    'Diamond push up'
  ]
},  

{
  id: 'smith-machine-chest-press',
  name: 'Smith Machine Chest Press',
  category: 'chest',
  subCategory: 'middle',
  difficulty: 'intermediate',
  equipment: ['bench', 'smith machine'],
  muscles: ['chest', 'triceps'],
  imageUrl: 'https://images.pexels.com/photos/4853664/pexels-photo-4853664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Adjust bench to flat at 180 degrees',
    'Set height of the smith machine so that elbows are just wider than 90 degrees',
    'Lie back on bench and grab the bar, slightly wider than shoulder width',
    'Feet flat, brace core and lift the bar off the rack',
    'Lower bar to middle chest, slow and controlled',
    'Push bar up, without locking elbows'
  ],
  tips: [
    'Keep wrists and elbows aligned throughout',
    'Keep elbows slightly tucked in',
    'Control the weight, do not bounce off your chest'
  ],
  commonMistakes: [
    'Letting weight fall too quickly',
    'Arching of the back',
    'Hands too close together',
    'Removing feet from floor'
  ],
  variations: [
    'Dumbbell chest press',
    'Cable chest press',
    'Barbell chest press'
  ]
},  

{
  id: 'barbell-pullovers',
  name: 'Barbell Pullovers',
  category: 'chest',
  subCategory: 'lower',
  difficulty: 'intermediate',
  equipment: ['bench', 'ez or straight bar'],
  muscles: ['chest', 'latissimus dorsi'],
  imageUrl: 'https://images.pexels.com/photos/6922166/pexels-photo-6922166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Adjust bench to flat at 180 degrees',
    'Grab the barbell with both hands, shoulder width apart',
    'Sit down and lie back on the bench, bringing the barbell to your chest',
    'Extend your arms without locking your elbows',
    'Slowly lower the barbell in an arc motion behind your head',
    'Using your chest and lats, bring the barbell back over your chest in the same arc motion'
  ],
  tips: [
    'Only stretch until arms are aligned with ears',
    'Keep elbows slightly bent',
    'Control the weight, do not let it fall too fast'
  ],
  commonMistakes: [
    'Hands too far apart',
    'Arching of the back',
    'Hands too close together',
    'Removing feet from floor'
  ],
  variations: [
    'Kettle bell pullover',
    'Dumbbell pullover'
  ]
},
{
  id: 'decline-barbell-press',
  name: 'Decline Barbell Press',
  category: 'chest',
  subCategory: 'lower',
  difficulty: 'intermediate',
  equipment: ['abdominal bench', 'barbell'],
  muscles: ['chest', 'abdominals'],
  imageUrl: 'https://images.pexels.com/photos/4162554/pexels-photo-4162554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Bring an abdominal bench over to a squat rack',
    'Set height of barbell so that arms are slightly over 90 degrees when lying flat on the bench',
    'Lie back on bench and grab the bar, slightly wider than shoulder width',
    'Brace core and lift the bar off the rack',
    'Lower bar to your lower chest, slightly higher than bottom of ribcage, slow and controlled',
    'Push bar up, without locking elbows'
  ],
  tips: [
    'Keep wrists and elbows aligned throughout',
    'Keep elbows slightly tucked in',
    'Control the weight, do not bounce off your chest'
  ],
  commonMistakes: [
    'Letting weight fall too quickly',
    'Arching of the back',
    'Hands too close together'
  ],
  variations: [
    'Incline cable press'
  ]
},

{
  id: 'decline-bench-cable-chest-press',
  name: 'Decline Bench Cable Chest Press',
  category: 'chest',
  subCategory: 'lower',
  difficulty: 'intermediate',
  equipment: ['abdominal bench', 'cable machine'],
  muscles: ['chest', 'abdominals'],
  imageUrl: 'https://images.pexels.com/photos/6353840/pexels-photo-6353840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Bring an abdominal bench over to a cable machine',
    'Set height of cable to the lower end numbers 0-2',
    'Lie back on bench and grab both handles',
    'Brace core and push the handles towards the sky without locking the elbows',
    'Slowly and controlled, let the machine pull the cables back so that your elbows make 90 degrees'
  ],
  tips: [
    'Keep wrists and elbows aligned throughout',
    'Keep elbows slightly tucked in',
    'Tense chest muscles when pushing'
  ],
  commonMistakes: [
    'Letting weight fall too quickly',
    'Arching of the back',
    'Hands too close together'
  ],
  variations: [
    'Decline barbell press',
    'Decline dumbbell press'
  ]
},

{
  id: 'decline-dumbbell-press',
  name: 'Decline Dumbbell Press',
  category: 'chest',
  subCategory: 'lower',
  difficulty: 'intermediate',
  equipment: ['abdominal bench', 'dumbbells'],
  muscles: ['chest', 'abdominals'],
  imageUrl: 'https://images.pexels.com/photos/7289245/pexels-photo-7289245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Find a free abdominal bench and set the height to 45 degrees',
    'Pick up the dumbbells and place on knee while getting on to the bench',
    'Lie back on bench and bring dumbbells in line with your chest, shoulder width apart',
    'Brace core and push the dumbbells to the sky, without locking your elbows',
    'Lower the dumbbells back down, until elbows are at 90 degrees'
  ],
  tips: [
    'Keep wrists and elbows aligned throughout',
    'Keep elbows slightly tucked in',
    'Control the weight'
  ],
  commonMistakes: [
    'Letting weight fall too quickly',
    'Arching of the back',
    'Dumbbells too close together'
  ],
  variations: [
    'Incline cable press',
    'Decline bench barbell press'
  ]
},

{
  id: 'decline-bench-smith-machine-press',
  name: 'Decline Bench Smith Machine Press',
  category: 'chest',
  subCategory: 'lower',
  difficulty: 'intermediate',
  equipment: ['abdominal bench', 'smith machine'],
  muscles: ['chest', 'abdominals'],
  imageUrl: 'https://images.pexels.com/photos/6922168/pexels-photo-6922168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Bring an abdominal bench over to a smith machine',
    'Set height of the smith machine so that elbows are just wider than 90 degrees when lying flat',
    'Lie back on bench and grab the bar, slightly wider than shoulder width',
    'Brace core and lift the bar off the rack',
    'Lower bar to lower chest, slow and controlled',
    'Push bar up, without locking elbows'
  ],
  tips: [
    'Keep wrists and elbows aligned throughout',
    'Keep elbows slightly tucked in',
    'Control the weight, do not bounce off your chest'
  ],
  commonMistakes: [
    'Letting weight fall too quickly',
    'Arching of the back',
    'Hands too close together',
    'Removing feet from floor'
  ],
  variations: [
    'Dumbbell chest press',
    'Cable chest press',
    'Barbell chest press'
  ]
},

{
  id: 'dips',
  name: 'Dips',
  category: 'chest',
  subCategory: 'lower',
  difficulty: 'intermediate',
  equipment: ['dip machine or parallel bars'],
  muscles: ['chest', 'triceps'],
  imageUrl: 'https://images.pexels.com/photos/8520040/pexels-photo-8520040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Grip the dip bars with your arms straight and body elevated off the floor',
    'Have hands slightly wider than shoulder-width apart',
    'Lean your torso forward about 30–45 degrees',
    'Slowly bend your elbows and lower yourself down',
    'Hold at the bottom for a second for maximum stretch',
    'Press through your palms to raise yourself back up to the starting position'
  ],
  tips: [
    'Keep elbows slightly bent when finishing the push',
    'Add a weighted belt to increase difficulty'
  ],
  commonMistakes: [
    'Not leaning forwards',
    'Have hands too far apart',
    'Dipping too low'
  ],
  variations: [
    'Weighted dips'
  ]
},

{
  id: 'decline-bench-dumbbell-flys',
  name: 'Decline Bench Dumbbell Flys',
  category: 'chest',
  subCategory: 'lower',
  difficulty: 'intermediate',
  equipment: ['bench', 'dumbbells'],
  muscles: ['chest', 'abdominals'],
  imageUrl: 'https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Adjust abdominal bench to an incline of about 45 degrees',
    'Pick up dumbbells and safely place on knees while sitting down',
    'Brace core, lie back and bring dumbbells together, palms facing inwards',
    'Brace core and push the dumbbells up, without locking elbows',
    'With elbows slightly bent, pull the dumbbells apart, in a hug motion',
    'Slowly, keep pulling the dumbbells apart until you feel tension on the chest',
    'Bring the dumbbells together, without touching them together, squeezing the chest'
  ],
  tips: [
    'Keep elbows slightly bent',
    'Do not let the dumbbells touch when bringing together'
  ],
  commonMistakes: [
    'Bringing dumbbells too far apart',
    'Arching of the back',
    'Hitting dumbbells together'
  ],
  variations: [
    'Upper cable fly'
  ]
},

{
  id: 'upper-cable-flys',
  name: 'Upper Cable Flys',
  category: 'chest',
  subCategory: 'lower',
  difficulty: 'intermediate',
  equipment: ['cable machine'],
  muscles: ['chest', 'front delts', 'triceps'],
  imageUrl: 'https://images.pexels.com/photos/5327499/pexels-photo-5327499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  instructions: [
    'Adjust height of cables on both sides to the higher range of numbers',
    'Attach a handle attachment to both cables',
    'Brace core, grab both handles and step forward until arms are pulled back slightly',
    'Place one foot in front of the other, knee slightly bent, push chest out and turn palms to the sky',
    'Bring hands together, in line with your chest, maintaining a slight elbow bend',
    'Slowly bring your hands apart, maintaining slight elbow bend, reaching the start position'
  ],
  tips: [
    'Keep feet planted for stability',
    'Keep elbows slightly bent when bringing arms across',
    'Push chest out for more of a targeted rep'
  ],
  commonMistakes: [
    'Letting elbows bend too much',
    'Not stepping far enough forward to feel the stretch',
    'Having the height of cable too high'
  ],
  variations: [
    'Decline bench dumbbell flys'
  ]
},
    {
      id: 'barbell-rows-(over-hand)',
      name: 'Barbell Rows (Over Hand)',
      category: 'back',
      subCategory: 'Upper Back',
      difficulty: 'intermediate',
      equipment: ['barbell'],
      muscles: ['Back', 'biceps'],
      imageUrl: 'https://images.pexels.com/photos/5878662/pexels-photo-5878662.jpeg?_gl=1*1bo2j05*_ga*NDM2MDU3NTU1LjE3NDcwODA1Nzk.*_ga_8JE65Q40S6*czE3NDk0OTgwNDYkbzEwJGcxJHQxNzQ5NDk4MTM1JGo1OSRsMCRoMA..',
      instructions: [
        'Place the barbell on the ground in front of you',
        'Stand with your feet shoulder-width apart',
        'Bend at the hips and knees to grip the barbell, knuckles facing the sky, just wider than knees',
        'Hinge at the hips so your torso is about 45 degrees to the floor and pull the weight to your lower chest and upper stomach',
        'Control the descent, do not let it drop, extend until your arms are slightly bent',
      ],
      tips: [
        'Do not round your lower back—keep it flat',
        'Pull your shoulder blades back and down',
        'Keep your core and glutes engaged throughout'
      ],
      commonMistakes: [
        'Arching of the back',
        'Standing too upright',
        'Lifting too heavy'
      ],
      variations: [
        'Dumbbell row',
        'Barbell row (under hand)',
        'Seated row'
      ]
    },
    {
      id: 'bent-over-upright-now',
      name: 'Bent Over Upright Now',
      category: 'back',
      subCategory: 'Upper Back',
      difficulty: 'intermediate',
      equipment: ['cable machine or bar'],
      muscles: ['back', 'biceps', 'shoulders'],
      imageUrl: 'https://images.pexels.com/photos/31818704/pexels-photo-31818704.jpeg?_gl=1*usf3u0*_ga*NDM2MDU3NTU1LjE3NDcwODA1Nzk.*_ga_8JE65Q40S6*czE3NDk1MDA4NTUkbzExJGcxJHQxNzQ5NTAyNjI5JGoxMiRsMCRoMA..',
      instructions: [
        'Stand shoulder width apart and set the machine to low height if using machine',
        'Grab the bar or cable and Let the bar hang at arms length in front of you, resting on your thighs',
        'Engage your core, keep your chest up, slight bend of the knees and bend at 45 degrees with a straight back',
        'Lift the bar straight up toward your collarbone and upper chest, stop when your elbows are at shoulder height',
        'Slowly lower the bar back down to the starting position',
      ],
      tips: [
        'Do not go higher than shoulder level to protect your shoulders',
        'Lead with the elbows, not the hands',
        'Lead with the elbows, not the hands'
      ],
      commonMistakes: [
        'Lifting the bar too high',
        'Jerking the movement',
        'Letting wrists bend'
      ],
      variations: [
        'Incline bench row',
        'Smith machine row'
      ]
    },
    {
      id: 'dumbbell-incline-row',
      name: 'Dumbbell Incline Row',
      category: 'back',
      subCategory: 'Upper Back',
      difficulty: 'intermediate',
      equipment: ['bench', 'dumbbells'],
      muscles: ['back', 'shoulders'],
      imageUrl: 'https://images.pexels.com/photos/19025674/pexels-photo-19025674.jpeg?_gl=1*1nvp9g3*_ga*NDM2MDU3NTU1LjE3NDcwODA1Nzk.*_ga_8JE65Q40S6*czE3NDk1MDA4NTUkbzExJGcxJHQxNzQ5NTA0MTMxJGo2MCRsMCRoMA..',
      instructions: [
        'Set the bench to a 30–45 degrees incline',
        'Lie face down on the bench and let your chest rest flat on the incline',
        'Hold a dumbbell in each hand, palms facing in (neutral grip), arms fully extended toward the floor',
        'Brace your core and retract your shoulder blades then pull the dumbbells upward, keeping elbows close to your sides',
        'Squeeze your shoulder blades at the top for 1 second then slowly lower the dumbbells back down',
      ],
      tips: [
        'Keep your head in a neutral position (do not crane your neck)',
        'Avoid shrugging your shoulders',
        'Do not let the dumbbells rest at the bottom, maintain tension throughout'
      ],
      commonMistakes: [
        'Elbows flaring out too much',
        'Jerking the movement',
        'Shrugging your shoulders'
      ],
      variations: [
        'Bent over upward row'
      ]
    },
    {
      id: 'dumbbell-shrugs',
      name: 'Dumbbell Shrugs',
      category: 'back',
      subCategory: 'Upper Back',
      difficulty: 'intermediate',
      equipment: ['dumbbells'],
      muscles: ['back', 'shoulders'],
      imageUrl: 'https://images.pexels.com/photos/6388973/pexels-photo-6388973.jpeg?_gl=1*twb9t1*_ga*NDM2MDU3NTU1LjE3NDcwODA1Nzk.*_ga_8JE65Q40S6*czE3NDk1MDA4NTUkbzExJGcxJHQxNzQ5NTA0ODc2JGoxNCRsMCRoMA..',
      instructions: [
        'Stand upright with your feet shoulder-width apart',
        'Lie face down on the bench and let your chest rest flat on the incline',
        'Hold a dumbbell in each hand with an overhand grip, palms facing your thighs, let your arms hang naturally at your sides',
        'Brace your core and Look straight ahead, with a neutral neck position',
        'Lift (shrug) your shoulders straight up toward your ears, at the top of the movement, pause for 1–2 seconds and squeeze your traps hard',
        'Slowly lower your shoulders back down to the starting position',

      ],
      tips: [
        'Keep arms straight, not bent',
        'DO NOT roll your shoulders',
        'Avoid leaning forward or backward'
      ],
      commonMistakes: [
        'Using momentum',
        'Shrugging too fast',
        'Rolling the shoulders'
      ],
      variations: [
        'Incline bench shrugs',
        'Barbell shrugs'

      ]
    },
    {
      id: 'face-pulls',
      name: 'Face Pulls',
      category: 'back',
      subCategory: 'Upper Back',
      difficulty: 'intermediate',
      equipment: ['cable machine'],
      muscles: ['back', 'shoulders'],
      imageUrl: 'https://images.pexels.com/photos/6740311/pexels-photo-6740311.jpeg?_gl=1*i7b6p9*_ga*NDM2MDU3NTU1LjE3NDcwODA1Nzk.*_ga_8JE65Q40S6*czE3NDk1MDA4NTUkbzExJGcxJHQxNzQ5NTA1NDI3JGo0MyRsMCRoMA..',
      instructions: [
        'Attach a rope handle to a cable machine and set the height to the higher numbers',
        'Face the machine and stand with your feet shoulder-width apart and a slight bend in your knees',
        'Hold the rope with both hands and step back so your arms are fully extended, and the rope is taut',
        'Engage your core, keep your chest up, and shoulders down',
        'Pull the rope toward your forehead or upper face until your hands are next to your ears',
        'Pause and squeeze your shoulder blades together at the top and slowly return the rope to the starting position with control',

      ],
      tips: [
        'Think elbows out, hands to ears',
        'Keep your neck neutral',
        'Avoid leaning too far backward, stay upright or slightly leaned back'
      ],
      commonMistakes: [
        'Pulling with biceps',
        'Letting shoulders rise or shrug',
        'Rushing the movement'
      ],
      variations: [
        'Incline bench shrugs',
        'Barbell shrugs'

      ]
    },
    {
      id: 'barbell-rows-(under-hand)',
      name: 'Barbell Rows (Under Hand)',
      category: 'back',
      subCategory: 'Middle Back',
      difficulty: 'intermediate',
      equipment: ['barbell'],
      muscles: ['Back', 'biceps'],
      imageUrl: 'https://images.pexels.com/photos/3025027/pexels-photo-3025027.png?_gl=1*h6vnm2*_ga*NDM2MDU3NTU1LjE3NDcwODA1Nzk.*_ga_8JE65Q40S6*czE3NDk0OTgwNDYkbzEwJGcxJHQxNzQ5NDk4MDY1JGo0MSRsMCRoMA..',
      instructions: [
        'Place the barbell on the ground in front of you',
        'Stand with your feet shoulder-width apart',
        'Bend at the hips and knees to grip the barbell, palms facing the sky, just wider than knees',
        'Hinge at the hips so your torso is about 45 degrees to the floor and pull the weight to your lower chest and upper stomach',
        'Control the descent, do not let it drop, extend until your arms are slightly bent',
      ],
      tips: [
        'Do not round your lower back—keep it flat',
        'Pull your shoulder blades back and down',
        'Keep your core and glutes engaged throughout'
      ],
      commonMistakes: [
        'Arching of the back',
        'Standing too upright',
        'Lifting too heavy'
      ],
      variations: [
        'Dumbbell row',
        'Barbell row (over hand)',
        'Seated row'
      ]
    },
    {
      id: 'landmine-row-with-attachment',
      name: 'Landmine Row With Attachment',
      category: 'back',
      subCategory: 'Middle Back',
      difficulty: 'intermediate',
      equipment: ['barbell', 'v-handle'],
      muscles: ['Back', 'biceps'],
      imageUrl: 'https://images.pexels.com/photos/703012/pexels-photo-703012.jpeg?_gl=1*qltofw*_ga*NDM2MDU3NTU1LjE3NDcwODA1Nzk.*_ga_8JE65Q40S6*czE3NDk1ODIxOTMkbzEyJGcxJHQxNzQ5NTgyMjE2JGozNyRsMCRoMA..',
      instructions: [
        'Insert one end of the barbell into a landmine base or wedge it securely in a corner',
        'Load the desired weight on the opposite end',
        'Using a v-handle attachment, place it underneath the barbell shaft just behind the weight plates',
        'Stand over the bar with feet shoulder-width apart, keep your back flat and chest up. Your torso should be roughly at a 45-degree angle to the floor',
        'Grab the barbell or the V-handle with both hands, brace your core and pull the bar toward your chest, squeezing your shoulder blades together',
        'Hold the contraction for a second at the top then slowly lower the bar back to the starting position while maintaining a tight core and neutral spine',
      ],
      tips: [
        'Avoid rounding your lower back',
        'Do not let your knees lock out — keep a slight bend',
        'Focus more on pulling with your back and driving the elbows'
      ],
      commonMistakes: [
        'Letting weight drop too quickly',
        'Arching of the back',
        'Shrugging of the shoulders'
      ],
      variations: [
        'Dumbbell row',
        'Barbell row (over hand)',
        'Seated row'
      ]
    },
    {
      id: 'landmine-row',
      name: 'Landmine Row',
      category: 'back',
      subCategory: 'Middle Back',
      difficulty: 'intermediate',
      equipment: ['barbell', 'v-handle'],
      muscles: ['Back', 'biceps'],
      imageUrl: 'https://images.pexels.com/photos/1092874/pexels-photo-1092874.jpeg?_gl=1*9dkmcn*_ga*NDM2MDU3NTU1LjE3NDcwODA1Nzk.*_ga_8JE65Q40S6*czE3NDk1ODIxOTMkbzEyJGcxJHQxNzQ5NTgzMTY4JGo1OSRsMCRoMA..',
      instructions: [
        'Insert one end of the barbell into a landmine base or wedge it securely in a corner',
        'Load the desired weight on the opposite end',
        'Stand over the bar with feet shoulder-width apart, keep your back flat and chest up. Your torso should be roughly at a 45-degree angle to the floor',
        'Grab the barbell with both hands, brace your core and pull the bar toward your chest, squeezing your shoulder blades together',
        'Hold the contraction for a second at the top then slowly lower the bar back to the starting position while maintaining a tight core and neutral spine',
      ],
      tips: [
        'Avoid rounding your lower back',
        'Do not let your knees lock out — keep a slight bend',
        'Focus more on pulling with your back and driving the elbows'
      ],
      commonMistakes: [
        'Letting weight drop too quickly',
        'Arching of the back',
        'Shrugging of the shoulders'
      ],
      variations: [
        'Dumbbell row',
        'Barbell row (over hand)',
        'Seated row'
      ]
    },
    {
      id: 'lat-pull-downs-(close-grip)',
      name: 'Lat Pull Downs (Close Grip)',
      category: 'back',
      subCategory: 'Middle Back',
      difficulty: 'intermediate',
      equipment: ['lat pulldown cable', 'v-handle'],
      muscles: ['Back', 'biceps'],
      imageUrl: 'https://images.pexels.com/photos/29825228/pexels-photo-29825228.jpeg?_gl=1*8ureb*_ga*NDM2MDU3NTU1LjE3NDcwODA1Nzk.*_ga_8JE65Q40S6*czE3NDk1ODIxOTMkbzEyJGcxJHQxNzQ5NTgzNjcyJGo1OSRsMCRoMA..',
      instructions: [
        'Attach the close grip V-bar to the lat pulldown cable and adjust the thigh pad so your legs are snug under it',
        'Sit down and grab the V-bar with a neutral grip (palms facing each other) while sitting tall with your chest up, core engaged, and shoulders down and back',
        'Pull the handle down toward your upper chest, focusing on driving your elbows down and back',
        'At the bottom of the movement, squeeze your shoulder blades together and pause for 1 second',
        'Slowly let the handle return to the starting position, fully extending your arms while keeping tension on your lats'
      ],
      tips: [
        'Keep your wrists neutral',
        'Keep your shoulders away from your ears (do not shrug)',
        'Focus more on pulling with your back and driving the elbows'
      ],
      commonMistakes: [
        'Letting weight drop too quickly',
        'Arching of the back',
        'Using momentum to pull the weight down'
      ],
      variations: [
        'Dumbbell row',
        'Barbell row (over hand)',
        'Seated row'
      ]
    },
    {
      id: 'seated-rows-(close-grip)',
      name: 'Seated Rows (Close Grip)',
      category: 'back',
      subCategory: 'Middle Back',
      difficulty: 'intermediate',
      equipment: ['seated row machine', 'v-handle'],
      muscles: ['Back', 'biceps'],
      imageUrl: 'https://images.pexels.com/photos/11876626/pexels-photo-11876626.jpeg?_gl=1*1uovwes*_ga*NDM2MDU3NTU1LjE3NDcwODA1Nzk.*_ga_8JE65Q40S6*czE3NDk1ODIxOTMkbzEyJGcxJHQxNzQ5NTg1Mjc4JGo0NyRsMCRoMA..',
      instructions: [
        'Attach the V-handle to the cable pulley and sit down on the bench or platform with feet placed firmly on the footrests',
        'Reach forward and grab the v-handle with a neutral grip, now pull the handle slightly to take the slack out of the cable, then sit upright',
        'With arms fully extended, but not locked, pull the handle toward your lower chest or upper abdomen, driving your elbows back close to your body',
        'At the peak contraction, squeeze your shoulder blades together and hold for 1–2 seconds',
        'Slowly extend your arms back to the start position, keeping the movement smooth and controlled'
      ],
      tips: [
        'Do not lean back excessively',
        'Maintain tension in your lats throughout the full range',
        'Focus more on pulling with your back and driving the elbows'
      ],
      commonMistakes: [
        'Letting weight drop too quickly',
        'Leaning back too far',
        'Using momentum to pull the weight down'
      ],
      variations: [
        'Landmine row',
        'Lat pull downs close grip',
        'Seated row'
      ]
    },
    {
      id: 'single-arm-dumbbell-row',
      name: 'Single Arm Dumbbell Row',
      category: 'back',
      subCategory: 'Middle Back',
      difficulty: 'intermediate',
      equipment: ['a dumbbell', 'flat bench or sturdy surface'],
      muscles: ['Back', 'biceps', 'deltoids'],
      imageUrl: 'https://images.pexels.com/photos/12890888/pexels-photo-12890888.jpeg?_gl=1*al43hv*_ga*NDM2MDU3NTU1LjE3NDcwODA1Nzk.*_ga_8JE65Q40S6*czE3NDk1ODIxOTMkbzEyJGcxJHQxNzQ5NTg2MDM4JGo0NyRsMCRoMA..',
      instructions: [
        'Place your left knee and left hand on the bench for support, your right foot stays on the floor, slightly behind you for balance',
        'With spine straight, hold the dumbbell in your right hand, arm fully extended beneath your shoulder',
        'Drive your elbow up and back, keeping it close to your body. Think about pulling your elbow toward your hip, not straight up',
        'At the top, hold the contraction for 1 second, squeezing your lat and mid-back',
        'Slowly lower the dumbbell back to the start position with control'
      ],
      tips: [
        'Keep your head in line with your spine',
        'Do not let you shoulder dip during the extension',
        'Focus more on pulling with your back and driving the elbows'
      ],
      commonMistakes: [
        'Twisting torso',
        'Using momentum to pull the weight up'
      ],
      variations: [
        'Landmine row',
        'Lat pull downs close grip',
        'Seated row'
      ]
    },
    {
      id: 'single-arm-seated-row',
      name: 'Single Arm Seated Row',
      category: 'back',
      subCategory: 'Middle Back',
      difficulty: 'intermediate',
      equipment: ['seated row machine', 'a D handle attachment'],
      muscles: ['Back', 'biceps'],
      imageUrl: 'https://images.pexels.com/photos/14423610/pexels-photo-14423610.jpeg?_gl=1*1kwgm3m*_ga*NDM2MDU3NTU1LjE3NDcwODA1Nzk.*_ga_8JE65Q40S6*czE3NDk1ODIxOTMkbzEyJGcxJHQxNzQ5NTg2NzcwJGo1OSRsMCRoMA..',
      instructions: [
        'Attach a single D-handle to the low pulley and sit on the bench or platform with your feet firmly on the footrests',
        'Grab the handle with one hand, keep your torso upright, chest up, and spine neutral',
        'Pull the handle toward your lower ribs or upper abs, driving your elbow back',
        'At the top of the row, pause briefly and contract your back muscles',
        'Slowly extend your arm forward, keeping the motion smooth and controlled'
      ],
      tips: [
        'Engage your core to prevent rotation or leaning during the row',
        'Focus on squeezing your shoulder blade back and down',
        'Focus more on pulling with your back and driving the elbows'
      ],
      commonMistakes: [
        'Twisting torso',
        'Using momentum to pull the weight back'
      ],
      variations: [
        'Landmine row',
        'Lat pull downs close grip',
        'Seated row'
      ]
    },
    {
      id: 'back-extensions',
      name: 'Back Extensions',
      category: 'back',
      subCategory: 'Lower Back',
      difficulty: 'advanced',
      equipment: ['roman chair or back extension bench'],
      muscles: ['back', 'core'],
      imageUrl: 'https://images.pexels.com/photos/8032912/pexels-photo-8032912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      instructions: [
        'Adjust the pad on the back extension bench so it sits just below your hip bones with feet firmly secured under the footpads',
        'Cross your arms over your chest or place your hands behind your head, keep your body straight, forming a line from your head to your feet',
        'Slowly bend at the hips to lower your upper body toward the floor until you feel a stretch in your hamstrings or until your torso is 90 degrees',
        'Squeeze your glutes and lower back to raise your torso back up, come up only until your body is in line with your legs',
      ],
      tips: [
        'Keep back straight at all times',
        'Use your glutes and hamstrings, not just your lower back',
        'Inhale as you lower, exhale as you raise',
      ],
      commonMistakes: [
        'Arching of the back',
        'Overextending coming back up',
        'Setting machine too high or low'
      ],
      variations: [
        'Deadlift',
        'Sumo Deadlift'
      ]
    },
    {
      id: 'deadlifts',
      name: 'Deadlifts',
      category: 'back',
      subCategory: 'Lower Back',
      difficulty: 'advanced',
      equipment: ['barbell', 'flat and grippy surface'],
      muscles: ['back', 'legs', 'core'],
      imageUrl: 'https://images.pexels.com/photos/7674497/pexels-photo-7674497.jpeg?_gl=1*17rkg64*_ga*NDM2MDU3NTU1LjE3NDcwODA1Nzk.*_ga_8JE65Q40S6*czE3NDk1ODkxMzgkbzEzJGcxJHQxNzQ5NTg5MTk1JGozJGwwJGgw',
      instructions: [
        'Stand With the Bar Over Mid-Foot, feet hip-width apart, toes pointing straight',
        'Hinge at the hips and bend your knees slightly to lower down, keeping your back straight',
        'Grab the bar just outside your knees with an overhand grip and flatten your back with your chest up, shoulders back and down, and spine neutral',
        'Drive through the floor by both pushing through your heels and extending your hips with your knees all at the same time',
        'Stand tall by fully extending your hips',
        'Lower with control by pushing your hips back and slowly bending your knees in one single motion, keeping your back straight',
      ],
      tips: [
        'Keep back straight at all times',
        'Keep grip just past knees, no more, no less',
        'Do not lift more than you can control',
        'Use a deadlift belt for further lumber support'
      ],
      commonMistakes: [
        'Arching of the back',
        'Lifting too much weight',
        'Keeping bar too far away from body'
      ],
      variations: [
        'Sumo deadlift',
      ]
    },
    {
      id: 'sumo-deadlifts',
      name: 'Sumo Deadlifts',
      category: 'back',
      subCategory: 'Lower Back',
      difficulty: 'advanced',
      equipment: ['barbell', 'flat and grippy surface'],
      muscles: ['back', 'legs', 'core'],
      imageUrl: 'https://images.pexels.com/photos/15373908/pexels-photo-15373908/free-photo-of-man-weightlifting-at-gym.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      instructions: [
        'Stand With the Bar Over Mid-Foot, feet wider than shoulder width, toes pointing straight',
        'Hinge at the hips and bend your knees slightly to lower down, keeping your back straight',
        'Grab the bar just outside your knees with an overhand grip and flatten your back with your chest up, shoulders back and down, and spine neutral',
        'Drive through the floor by both pushing through your heels and extending your hips with your knees all at the same time',
        'Stand tall by fully extending your hips',
        'Lower with control by pushing your hips back and slowly bending your knees in one single motion, keeping your back straight',
      ],
      tips: [
        'Keep back straight at all times',
        'Keep grip just past knees, no more, no less',
        'Do not lift more than you can control',
        'Use a deadlift belt for further lumber support'
      ],
      commonMistakes: [
        'Arching of the back',
        'Lifting too much weight',
        'Keeping bar too far away from body'
      ],
      variations: [
        'Deadlift',
      ]
    },
    {
      id: 'behind-the-head-lat-pulldowns',
      name: 'Behind The Head Lat Pulldowns',
      category: 'back',
      subCategory: 'Lats',
      difficulty: 'intermediate',
      equipment: ['lat pulldown machine', 'wide grip bar'],
      muscles: ['back', 'biceps'],
      imageUrl: 'https://images.pexels.com/photos/30165244/pexels-photo-30165244/free-photo-of-bodybuilder-performing-lat-pulldown-in-gym.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      instructions: [
        'Adjust the seat height so your thighs are secured under the pad snugly and attach the wide grip bar',
        'Use a wide overhand grip, slightly wider shoulder width, sit down and let the bar gently pull your arms up to stretch your lats',
        'Grab the bar just outside your knees with an overhand grip and flatten your back with your chest up, shoulders back and down, and spine neutral',
        'Lean your torso forward about 10–15 degrees, this prevents the bar from hitting your head and avoids straining your cervical spine',
        'Keep your chest lifted, shoulders back and pull the bar down in a controlled motion behind your head until the bar reaches bottom of the neck',
        'Squeeze your shoulder blades together then let the bar rise back up under control until your arms are fully extended'
      ],
      tips: [
        'Keep back straight at all times',
        'Focus on driving your elbows down and slightly back',
        'Do not lift more than you can control',
        'Keep your neck in a neutral position'
      ],
      commonMistakes: [
        'Arching of the back',
        'Lifting too much weight',
        'Pulling bar too far down'
      ],
      variations: [
        'Lat pulldowns',
        'Seated row wide grip'
      ]
    },
    {
      id: 'lat-pulldowns',
      name: 'Lat Pulldowns',
      category: 'back',
      subCategory: 'Lats',
      difficulty: 'intermediate',
      equipment: ['lat pulldown machine', 'wide grip bar'],
      muscles: ['back', 'biceps'],
      imageUrl: 'https://images.pexels.com/photos/17210044/pexels-photo-17210044/free-photo-of-man-exercising-at-the-gym.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      instructions: [
        'Adjust the seat height so your thighs are secured under the pad snugly and attach the wide grip bar',
        'Use a wide overhand grip, slightly wider shoulder width, sit down and let the bar gently pull your arms up to stretch your lats',
        'Grab the bar just outside your knees with an overhand grip and flatten your back with your chest up, shoulders back and down, and spine neutral',
        'Keep your chest lifted, shoulders back and pull the bar down in a controlled motion behind your head until the bar reaches bottom of the neck',
        'Squeeze your shoulder blades together then let the bar rise back up under control until your arms are fully extended'
      ],
      tips: [
        'Keep back straight at all times',
        'Focus on driving your elbows down and slightly back',
        'Do not lift more than you can control',
        'Keep your neck in a neutral position'
      ],
      commonMistakes: [
        'Arching of the back',
        'Lifting too much weight',
        'Pulling bar too far down'
      ],
      variations: [
        'Behind the head lat pulldowns',
        'Seated row wide grip'
      ]
    },
    {
      id: 'cable-lat-pullovers',
      name: 'Cable Lat Pullovers',
      category: 'back',
      subCategory: 'Lats',
      difficulty: 'intermediate',
      equipment: ['cable machine', 'straight bar or rope attachment'],
      muscles: ['back', 'biceps'],
      imageUrl: 'https://images.pexels.com/photos/13616290/pexels-photo-13616290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      instructions: [
        'Attach a straight bar or rope to the high pulley',
        'Stand facing the machine, feet shoulder-width apart then step back slightly so there is tension on the cable with your arms extended in front of you',
        'Slightly bend your knees and hinge forward at the hips about 30–45 degrees and arms should be in line with your ears, stretched forward toward the pulley',
        'Begin the movement by pulling the bar or rope downward in an arc, keeping your back straight and elbows slightly bent',
        'At the bottom of the movement with bar near your hips, squeeze your lats hard then Slowly let the bar rise back up along the same arc path to the starting position'
      ],
      tips: [
        'Keep back straight at all times',
        'Do not bend your elbows too much',
        'Do not lift more than you can control',
        'Keep your neck in a neutral position'
      ],
      commonMistakes: [
        'Arching of the back',
        'Lifting too much weight',
        'Using elbows too much'
      ],
      variations: [
        'Kneeling cable pullovers'
      ]
    },
    {
      id: 'assisted-pull-ups',
      name: 'Assisted Pull Up',
      category: 'back',
      subCategory: 'Lats',
      difficulty: 'intermediate',
      equipment: ['cable machine', 'straight bar or rope attachment'],
      muscles: ['back', 'biceps'],
      imageUrl: 'https://images.pexels.com/photos/13975513/pexels-photo-13975513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      instructions: [
        'Loop a resistance band over a pull-up bar and secure it then place one knee or foot in the band to provide assistance',
        'Grab the bar with a wide grip and hang with your arms fully extended, lats slightly engaged, and shoulders down and back',
        'Initiate the movement by driving your elbows down and back and pull until your chin clears the bar',
        'Slowly lower yourself back to the starting position with control',
      ],
      tips: [
        'Keep back straight at all times',
        'Exhale as you pull up, inhale as you lower',
        'Reduce assistance over time as you get stronger'
      ],
      commonMistakes: [
        'Arching of the back',
        'Swinging or kicking'
      ],
      variations: [
        'Pull ups',
        'Weighted pull ups'
      ]
    },
    {
      id: 'pull-ups',
      name: 'Pull Ups',
      category: 'back',
      subCategory: 'Lats',
      difficulty: 'intermediate',
      equipment: ['cable machine', 'straight bar or rope attachment'],
      muscles: ['back', 'biceps'],
      imageUrl: 'https://images.pexels.com/photos/5750628/pexels-photo-5750628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      instructions: [
        'Grab the bar with a wide grip and hang with your arms fully extended, lats slightly engaged, and shoulders down and back',
        'Initiate the movement by driving your elbows down and back and pull until your chin clears the bar',
        'Slowly lower yourself back to the starting position with control',
      ],
      tips: [
        'Keep back straight at all times',
        'Exhale as you pull up, inhale as you lower',
        'Reduce assistance over time as you get stronger'
      ],
      commonMistakes: [
        'Arching of the back',
        'Swinging or kicking'
      ],
      variations: [
        'Assisted pull ups',
        'Weighted pull ups'
      ]
    },
    {
      id: 'seated-rows-wide-grip',
      name: 'Seated Rows Wide Grip',
      category: 'back',
      subCategory: 'Lats',
      difficulty: 'intermediate',
      equipment: ['seated cable machine', 'wide grip bar attachment'],
      muscles: ['back', 'biceps'],
      imageUrl: 'https://images.pexels.com/photos/4162486/pexels-photo-4162486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      instructions: [
        'Attach a wide grip bar to the cable row machine, sit on the bench and place your feet flat on the footrests',
        'Sit tall with your back straight, core braced, shoulders relaxed, and knees slightly bent',
        'Initiate the pull by driving your elbows out and back and pull the bar toward your upper abdomen or lower chest',
      ],
      tips: [
        'Keep back straight at all times',
        'Exhale as you pull, inhale as you return',
        'Do not jerk the weight'
      ],
      commonMistakes: [
        'Arching of the back',
        'Swinging to gain momentum'
      ],
      variations: [
        'Assisted pull ups',
        'Weighted pull ups'
      ]
    },
    {
      id: 'single-arm-lat-pulldowns',
      name: 'Single Arm Lat Pulldowns',
      category: 'back',
      subCategory: 'Lats',
      difficulty: 'intermediate',
      equipment: ['lat pulldown machine or high pulley cable', 'a D handle'],
      muscles: ['back', 'biceps'],
      imageUrl: 'https://images.pexels.com/photos/31616767/pexels-photo-31616767/free-photo-of-close-up-of-gym-equipment-pulley-system.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      instructions: [
        'Attach a D-handle to the high pulley of a cable machine or lat pulldown',
        'Secure your thighs under the pad, grab the D handle until arm is fully extended above you, with a slight stretch in your lat',
        'Initiate the pull by driving your elbow down and slightly back and at the bottom of the movement, squeeze your lat hard for 1 second',
        'Slowly let the handle rise back up, allowing your lat to stretch',
      ],
      tips: [
        'Keep back straight at all times',
        'Exhale as you pull, inhale as you return',
        'Keep your shoulders down throughout'
      ],
      commonMistakes: [
        'Arching of the back',
        'Swinging to gain momentum'
      ],
      variations: [
        'Assisted pull ups',
        'Lat pulldowns'
      ]
    },
    {
      id: 'cable-shoulder-press',
      name: 'Cable Shoulder Press',
      category: 'shoulders',
      subCategory: 'Front',
      difficulty: 'intermediate',
      equipment: ['cable machine', 'D handle attachments'],
      muscles: ['shoulders', 'triceps'],
      imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761081385/Firefly_Someone_performing_in_the_gym_46148_3_himabp.jpg',
      instructions: [
        'Adjust the pulleys to just below shoulder height and attach D handles to both',
        'Stand upright with your feet shoulder-width apart, grab the handles with a neutral grip and step forward to create light tension',
        'Handles at shoulder height, elbows bent at about 90 degrees and push the handles upward and slightly inward, extending your arms fully without locking your elbows',
        'Briefly squeeze your shoulders at the top of the movement, arms should be almost straight, in line with your ears',
        'Lower the handles slowly and with control back to the starting position',
      ],
      tips: [
        'Do not flare your elbows straight out',
        'If balance is hard, stagger your stance (one foot slightly forward)',
        'Breathe: Exhale on the press up, inhale on the way down'
      ],
      commonMistakes: [
        'Arching of the back or leaning back',
        'Hitting attachments together',
        'Locking elbows when pushing'
      ],
      variations: [
        'Seated cable shoulder press',
        'Single-arm cable press'
      ]
    },
    {
      id: 'front-plate-raises',
      name: 'Front Plate Raises',
      category: 'shoulders',
      subCategory: 'Front',
      difficulty: 'intermediate',
      equipment: ['weighted plate'],
      muscles: ['shoulders', 'triceps'],
      imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761081329/Firefly_Someone_performing_in_the_gym_524487_5_tol1nw.jpg',
      instructions: [
        ' Stand tall, feet shoulder-width',
        'Stand upright with your feet shoulder-width apart, grab the handles with a neutral grip and step forward to create light tension',
        'Handles at shoulder height, elbows bent at about 90 degrees and push the handles upward and slightly inward, extending your arms fully without locking your elbows',
        'Briefly squeeze your shoulders at the top of the movement, arms should be almost straight, in line with your ears',
        'Lower the handles slowly and with control back to the starting position',
      ],
      tips: [
        'Do not flare your elbows straight out',
        'If balance is hard, stagger your stance (one foot slightly forward)',
        'Breathe: Exhale on the press up, inhale on the way down'
      ],
      commonMistakes: [
        'Arching of the back or leaning back',
        'Hitting attachments together',
        'Locking elbows when pushing'
      ],
      variations: [
        'Seated cable shoulder press',
        'Single-arm cable press'
      ]
    },
    {
      id: 'seated-front-dumbbell-raises',
      name: 'Seated Front Dumbbell Raises',
      category: 'shoulders',
      subCategory: 'front',
      difficulty: 'intermediate',
      equipment: ['dumbbells', 'a bench or an elevated flat surface'],
      muscles: ['shoulders'],
      imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761081258/Firefly_Someone_performing_in_the_gym_86809_7_ijxcwl.jpg',
      instructions: [
        'Adjust bench to 90 degrees, grab dumbbells with a neutral grip and position them to your side',
        'With elbows slightly bent, brace your core and lift the dumbbells in front of you until in line with shoulder height',
        'Squeeze shoulders at the top, slow and controlled, bring the weights to the starting position',
      ],
      tips: [
        'Feet flat on the floor, hip-width apart to create a solid base',
        'Think of pouring water at the top (tilt thumbs slightly down)',
        'Keep arms parallel to the ground at the top'
      ],
      commonMistakes: [
        'Arching of the back or leaning back',
        'Swinging of the weight',
        'Lifting weight above shoulder height'
      ],
      variations: [
        'Cable front raises',
        'Seated Single arm front dumbbell raises'
      ]
    },
    {
      id: 'cable-front-raises',
      name: 'Cable Front Raises',
      category: 'shoulders',
      subCategory: 'front',
      difficulty: 'intermediate',
      equipment: ['cable machine', 'straight bar attachment'],
      muscles: ['shoulders'],
      imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761081203/Firefly_Someone_performing_in_the_gym_86809_6_bt2blb.jpg',
      instructions: [
        'Adjust the height of the pully to the bottom height level and attach the straight bar attachment',
        'Step over the straight bar attachment, with the bar between your legs, facing away from the machine',
        'Grasp the bar attachment and straight your back, so the cable has some tension',
        'Keeping slight bend of the elbows, raise the bar in front of you in an arch motion, stopping at shoulder height',
        'Squeeze at the shoulders then lower the bar down, in the same arch motion, until returning to the starting position',
      ],
      tips: [
        'Feet flat on the floor, hip-width apart to create a solid base',
        'Head and chest up at all times (no slouching)',
        'Brace core and straighten back'
      ],
      commonMistakes: [
        'Arching of the back or leaning back',
        'Swinging of the weight',
        'Lifting weight above shoulder height'
      ],
      variations: [
        'Seated front dumbbell raises ',
        'Seated Single arm front dumbbell raises'
      ]
    },
    {
      id: 'seated-barbell-shoulder-press',
      name: 'Seated Barbell Shoulder Press',
      category: 'shoulders',
      subCategory: 'front',
      difficulty: 'intermediate',
      equipment: ['bench', 'squat rack'],
      muscles: ['shoulders'],
      imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761081131/Firefly_Someone_performing_in_the_gym_46148_2_t1pbl1.jpg',
      instructions: [
        'Bring a bench over to a squat rack, set the bench to 80 degrees, then set the height of the bar to which elbows are slightly bent when extended',
        'Grab the bar slightly wider than shoulder-width, brace core and with a straight back, drive through legs and left the bar off the rack',
        'Slow and controlled, let the bar fall to just above upper chest, without touching your chest',
        'Push the bar upwards until arms are almost fully extended, maintaining a slight elbow bend and squeeze shoulders at the end of the extension'
      ],
      tips: [
        'Feet flat on the floor, hip-width apart to create a solid base',
        'Head and chest up at all times (no slouching)',
        'Brace core and straighten back'
      ],
      commonMistakes: [
        'Arching of the back or leaning back',
        'Letting weight fall too quickly and bouncing off chest',
        'Locking the elbows at the extension'
      ],
      variations: [
        'Seated dumbbell press ',
        'Arnold press',
        'Standing overhead press'
      ]
    },
    {
      id: 'seated-cable-shoulder-press',
      name: 'Seated Cable Shoulder Press',
      category: 'shoulders',
      subCategory: 'front',
      difficulty: 'intermediate',
      equipment: ['bench', 'cable machine'],
      muscles: ['shoulders'],
      imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761081074/Firefly_Someone_performing_in_the_gym_643721_2_ualnvm.jpg',
      instructions: [
        'Bring a bench over to a cable machine, angle it at 80 degrees, facing away from the machine and in between the two cables',
        'Attach a D handle to each pully, sit down and individually pull each cable to your chest and together',
        'Bring cables apart in a pressing motion so that your elbows are start the exercise at 90 degrees',
        'With a straight back, brace core and push upwards until elbows are slightly bent',
        'Squeeze shoulders at the top, then slow and controlled bring the cables down to the starting position (elbows at 90 degrees)'
      ],
      tips: [
        'Feet flat on the floor, hip-width apart to create a solid base',
        'Push through feet and legs to help drive the weight up',
        'Do not hit the attachments together'
      ],
      commonMistakes: [
        'Arching of the back',
        'Lifting to heavy or letting weight fall too quickly',
        'Locking the elbows at the extension'
      ],
      variations: [
        'Seated dumbbell press',
        'Arnold press',
        'Standing overhead press'
      ]
    },
{
  id: 'machine-assisted-side-raise',
  name: 'Machine Assisted Side Raise',
  category: 'shoulders',
  subCategory: 'side',
  difficulty: 'beginner',
  equipment: ['machine'],
  muscles: ['shoulders', 'lateral deltoid'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761081013/Firefly_Someone_performing_in_the_gym_46148_1_nwsvb9.jpg',
  instructions: [
    'Set the seat so the machines pivot lines up with your shoulder joint and pads rest just above your elbows.',
    'Sit tall with feet flat, core braced, and shoulders slightly back and down.',
    'Begin with elbows bent slightly (10–20°) and arms by your sides.',
    'Raise arms out to the sides, leading with elbows, until upper arms reach shoulder height.',
    'Pause briefly at the top, then slowly lower in 2–3 seconds back to the start without letting the stack slam.',
    'Exhale as you raise, inhale as you lower.'
  ],
  tips: [
    'Think "elbows up, shoulders down".',
    'Lead with elbows, not hands.',
    'Control the lowering phase for maximum benefit.'
  ],
  commonMistakes: [
    'Using too much weight and swinging.',
    'Shrugging shoulders traps taking over.',
    'Locking elbows or twisting wrists downward.',
    'Going much higher than shoulder height.'
  ],
  variations: [
    'Single-arm machine lateral raise',
    'Top-range partials after full reps',
    'Warm-up sets with lighter weight'
  ]
},
{
  id: 'dumbbell-side-raise',
  name: 'Dumbbell Side Raise',
  category: 'shoulders',
  subCategory: 'side',
  difficulty: 'beginner',
  equipment: ['dumbbells'],
  muscles: ['shoulders', 'lateral deltoid'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761080957/Firefly_Someone_performing_in_the_gym_524487_3_eclaov.jpg',
  instructions: [
    'Stand tall with feet hip-width apart, holding a dumbbell in each hand by your sides with palms facing inward.',
    'Brace your core and keep a slight bend in the elbows (10–20°).',
    'Raise your arms out to the sides, leading with your elbows, until they reach shoulder height.',
    'Pause briefly at the top, keeping shoulders down.',
    'Lower the dumbbells slowly and under control back to your sides.',
    'Exhale as you lift, inhale as you lower.'
  ],
  tips: [
    'Think "elbows up, shoulders down".',
    'Keep wrists under elbows, do not let hands drift higher.',
    'Control the weight — avoid using momentum.'
  ],
  commonMistakes: [
    'Using too much weight and swinging the body.',
    'Shrugging the shoulders (overusing traps).',
    'Locking elbows straight.',
    'Raising arms above shoulder height.'
  ],
  variations: [
    'Seated dumbbell side raise',
    'Alternating single-arm raise',
    'Leaning side lateral raise'
  ]
},
{
  id: 'barbell-upright-row',
  name: 'Barbell Upright Row',
  category: 'shoulders',
  subCategory: 'side',
  difficulty: 'intermediate',
  equipment: ['barbell'],
  muscles: ['shoulders', 'trapezius', 'lateral deltoid'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761080885/Firefly_Someone_performing_in_the_gym_86809_5_vjpsh3.jpg',
  instructions: [
    'Stand tall with feet hip-width apart, holding a barbell with an overhand grip in front of your thighs.',
    'Grip the bar slightly narrower than shoulder-width.',
    'Brace your core and keep your chest lifted.',
    'Pull the bar upward along your body, leading with your elbows, until they reach just below shoulder height.',
    'Pause briefly at the top, elbows pointing outward and higher than wrists.',
    'Lower the bar slowly back to the starting position in a controlled manner.'
  ],
  tips: [
    'Keep the bar close to your body throughout the lift.',
    'Lead with your elbows, not your hands.',
    'Stop at or just below shoulder height to protect your shoulders.',
    'Maintain a neutral wrist position — avoid bending them excessively.'
  ],
  commonMistakes: [
    'Using too much weight and jerking the bar.',
    'Raising the bar too high, which can strain the shoulders.',
    'Shrugging excessively instead of keeping the shoulders down.',
    'Letting wrists bend inward or outward unnaturally.'
  ],
  variations: [
    'Dumbbell upright row',
    'Cable upright row',
    'Kettlebell upright row'
  ]
},
{
  id: 'reverse-pec-deck',
  name: 'Reverse Pec Deck',
  category: 'shoulders',
  subCategory: 'rear',
  difficulty: 'beginner',
  equipment: ['pec deck machine'],
  muscles: ['rear deltoids', 'trapezius', 'rhomboids'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761076705/Firefly_Someone_performing_in_the_gym_86809_4_ogtc0z.jpg',
  instructions: [
    'Sit facing the machine with chest against the pad and feet flat on the floor.',
    'Grasp the handles or pads with arms slightly bent.',
    'Keep shoulders down and back, and elbows slightly bent.',
    'Pull the handles outward and back in a controlled arc until your arms are parallel with your shoulders.',
    'Pause briefly, then slowly return to the starting position.'
  ],
  tips: [
    'Focus on squeezing the rear delts and upper back.',
    'Avoid using momentum or leaning forward.',
    'Keep a controlled motion throughout.'
  ],
  commonMistakes: [
    'Swinging the weight or using torso momentum.',
    'Shrugging shoulders.',
    'Locking elbows straight.'
  ],
  variations: [
    'Dumbbell rear delt fly',
    'Cable rear delt fly',
    'Incline bench rear delt fly'
  ]
},
{
  id: 'dumbbell-rear-delt-fly',
  name: 'Dumbbell Rear Delt Fly',
  category: 'shoulders',
  subCategory: 'rear',
  difficulty: 'beginner',
  equipment: ['dumbbells', 'bench'],
  muscles: ['rear deltoids', 'trapezius', 'rhomboids'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761076643/Firefly_Someone_performing_in_the_gym_643721_1_coanv6.jpg',
  instructions: [
    'Sit on the edge of a bench or stand with a slight forward bend at the hips.',
    'Hold a dumbbell in each hand with palms facing each other.',
    'Keep a slight bend in your elbows.',
    'Raise the dumbbells out to the sides in a wide arc until arms are parallel with shoulders.',
    'Pause briefly, then slowly lower the weights back down.'
  ],
  tips: [
    'Focus on squeezing the rear delts.',
    'Maintain a neutral spine and avoid rounding the back.',
    'Use controlled movement — avoid swinging.'
  ],
  commonMistakes: [
    'Using too heavy weights.',
    'Swinging torso to lift dumbbells.',
    'Shrugging shoulders or bending wrists.'
  ],
  variations: [
    'Incline bench rear delt fly',
    'Cable rear delt fly',
    'Reverse pec deck'
  ]
},
{
  id: 'incline-bench-rear-delt-fly',
  name: 'Incline Bench Rear Delt Fly',
  category: 'shoulders',
  subCategory: 'rear',
  difficulty: 'beginner',
  equipment: ['bench', 'dumbbells'],
  muscles: ['rear deltoids', 'trapezius', 'rhomboids'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761076579/Firefly_Someone_performing_in_the_gym_524487_2_ndgrl3.jpg',
  instructions: [
    'Lie face down on an incline bench holding dumbbells in each hand with palms facing each other.',
    'Keep elbows slightly bent and let arms hang down.',
    'Lift the dumbbells out to the sides until arms are parallel with shoulders.',
    'Pause at the top, then slowly lower back down.'
  ],
  tips: [
    'Focus on rear delt contraction.',
    'Keep the motion controlled, avoid swinging.',
    'Keep neck neutral and head in line with spine.'
  ],
  commonMistakes: [
    'Lifting too heavy and using momentum.',
    'Shrugging shoulders.',
    'Bending elbows too much or locking them.'
  ],
  variations: [
    'Dumbbell rear delt fly',
    'Cable rear delt fly',
    'Reverse pec deck'
  ]
},
{
  id: 'cable-face-pulls',
  name: 'Cable Face Pulls',
  category: 'shoulders',
  subCategory: 'rear',
  difficulty: 'intermediate',
  equipment: ['cable machine', 'rope attachment'],
  muscles: ['rear deltoids', 'trapezius', 'rhomboids'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761076493/Firefly_Someone_performing_in_the_gym_86809_3_zl4t0o.jpg',
  instructions: [
    'Attach a rope to a high pulley and stand facing the machine.',
    'Grasp the rope with an overhand grip and step back to tension the cable.',
    'Pull the rope towards your face, elbows flaring outward and high.',
    'Squeeze the shoulder blades together at the peak contraction.',
    'Slowly return to the starting position.'
  ],
  tips: [
    'Keep core tight and avoid leaning back.',
    'Focus on the rear delts and upper back.',
    'Use controlled movements.'
  ],
  commonMistakes: [
    'Pulling with arms instead of rear delts.',
    'Using momentum or jerking the rope.',
    'Shrugging shoulders.'
  ],
  variations: [
    'Cable rear delt fly',
    'Dumbbell rear delt fly',
    'TRX/Y-T-W raises'
  ]
},
{
  id: 'cable-rear-delt-fly',
  name: 'Cable Rear Delt Fly',
  category: 'shoulders',
  subCategory: 'rear',
  difficulty: 'intermediate',
  equipment: ['cable machine', 'single handle attachments'],
  muscles: ['rear deltoids', 'trapezius', 'rhomboids'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761076421/Firefly_Someone_performing_in_the_gym_86809_2_rmshse.jpg',
  instructions: [
    'Attach handles to the low pulleys of a cable machine and stand in the center.',
    'Grab a handle in each hand with arms crossed in front of you.',
    'Keep a slight bend in the elbows.',
    'Pull the handles outward and backward in a wide arc until arms are parallel to the floor.',
    'Pause, then slowly return to start.'
  ],
  tips: [
    'Focus on rear delt contraction.',
    'Keep movements slow and controlled.',
    'Avoid shrugging shoulders.'
  ],
  commonMistakes: [
    'Using too heavy weights and swinging.',
    'Allowing elbows to drop or lock.',
    'Shrugging or leaning back excessively.'
  ],
  variations: [
    'Dumbbell rear delt fly',
    'Incline bench rear delt fly',
    'Reverse pec deck'
  ]
},
{
  id: 'barbell-reverse-rows',
  name: 'Barbell Reverse Rows',
  category: 'back',
  subCategory: 'rear',
  difficulty: 'intermediate',
  equipment: ['barbell'],
  muscles: ['rear deltoids', 'trapezius', 'rhomboids', 'lats'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761076316/Firefly_Someone_performing_in_the_gym_524487_1_wmdocv.jpg',
  instructions: [
    'Hold a barbell with an overhand grip, hands slightly wider than shoulder-width.',
    'Hinge at hips and lean forward until torso is roughly parallel to the floor.',
    'Keep core tight and back flat.',
    'Pull the barbell toward your upper chest/neck, leading with elbows.',
    'Pause at the top, squeeze shoulder blades together, then lower slowly.'
  ],
  tips: [
    'Focus on retracting shoulder blades.',
    'Avoid using momentum or jerking the bar.',
    'Keep neck neutral.'
  ],
  commonMistakes: [
    'Rounding the back.',
    'Using arms only instead of back muscles.',
    'Swinging the barbell.'
  ],
  variations: [
    'Dumbbell reverse row',
    'Cable reverse row',
    'TRX inverted row'
  ]
},
{
  id: 'reverse-cable-crossover',
  name: 'Reverse Cable Crossover',
  category: 'shoulders',
  subCategory: 'rear',
  difficulty: 'intermediate',
  equipment: ['cable machine', 'single handle attachments'],
  muscles: ['rear deltoids', 'trapezius', 'rhomboids'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761076199/Firefly_Someone_performing_in_the_gym_86809_1_tjrd5r.jpg',
  instructions: [
    'Set pulleys to shoulder height on a cable machine.',
    'Stand in the center and hold a handle in each hand with arms crossed in front of you.',
    'With elbows slightly bent, pull the handles outward and backward until arms are parallel with the floor.',
    'Pause and squeeze shoulder blades, then slowly return to start.'
  ],
  tips: [
    'Keep torso upright and core engaged.',
    'Focus on rear delt contraction.',
    'Move slowly and controlled.'
  ],
  commonMistakes: [
    'Swinging the arms.',
    'Using too heavy weights.',
    'Shrugging shoulders.'
  ],
  variations: [
    'Dumbbell rear delt fly',
    'Reverse pec deck',
    'Cable rear delt fly'
  ]
},
{
  id: 'dumbbell-reverse-shrugs',
  name: 'Dumbbell Reverse Shrugs',
  category: 'shoulders',
  subCategory: 'rear',
  difficulty: 'beginner',
  equipment: ['dumbbells'],
  muscles: ['trapezius', 'rear deltoids'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761076114/Firefly_Someone_performing_in_the_gym_643721_g2vx5a.jpg',
  instructions: [
    'Hold a dumbbell in each hand with palms facing backward, arms by your sides.',
    'Keep elbows straight and shoulders down.',
    'Lift the shoulders backward/up as high as possible, squeezing traps and rear delts.',
    'Pause briefly, then lower slowly.'
  ],
  tips: [
    'Focus on squeezing rear traps and delts.',
    'Avoid rotating or shrugging forward.',
    'Use controlled motion.'
  ],
  commonMistakes: [
    'Using momentum.',
    'Rolling shoulders forward.',
    'Bending elbows.'
  ],
  variations: [
    'Barbell reverse shrugs',
    'Cable reverse shrugs',
    'TRX/Y-T-W raises'
  ]
},
{
  id: 'trx-y-t-w-raises',
  name: 'TRX/Y-T-W Raises',
  category: 'shoulders',
  subCategory: 'rear',
  difficulty: 'intermediate',
  equipment: ['TRX straps'],
  muscles: ['rear deltoids', 'trapezius', 'rhomboids'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761075907/Firefly_Someone_performing_in_the_gym_86809_m2td7k.jpg',
  instructions: [
    'Adjust TRX straps and stand facing the anchor point.',
    'Lean back and hold the handles with arms extended.',
    'Perform Y, T, and W movements by raising arms in the corresponding shapes while squeezing rear delts and upper back.',
    'Lower back to start slowly after each rep.'
  ],
  tips: [
    'Keep core tight and spine neutral.',
    'Move slowly and focus on rear delt activation.',
    'Do not swing.'
  ],
  commonMistakes: [
    'Using momentum.',
    'Arching or rounding the back.',
    'Shrugging shoulders.'
  ],
  variations: [
    'Dumbbell reverse fly',
    'Cable face pulls',
    'Band pull-aparts'
  ]
},
{
  id: 'band-pull-aparts',
  name: 'Band Pull-Aparts',
  category: 'shoulders',
  subCategory: 'rear',
  difficulty: 'beginner',
  equipment: ['resistance band'],
  muscles: ['rear deltoids', 'trapezius', 'rhomboids'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761075765/Firefly_Someone_performing_in_the_gym_524487_agpdrt.jpg',
  instructions: [
    'Hold a resistance band with both hands in front of you at shoulder height.',
    'Arms slightly bent and band taut.',
    'Pull the band apart by moving hands outward until arms are in line with shoulders.',
    'Squeeze rear delts and upper back at the peak, then slowly return to start.'
  ],
  tips: [
    'Move slowly and focus on rear delt contraction.',
    'Keep shoulders down and avoid shrugging.',
    'Maintain slight bend in elbows.'
  ],
  commonMistakes: [
    'Using momentum or snapping the band.',
    'Shrugging shoulders.',
    'Locking elbows.'
  ],
  variations: [
    'TRX/Y-T-W raises',
    'Dumbbell rear delt fly',
    'Cable rear delt fly'
  ]
},
{
  id: 'barbell-curl',
  name: 'Barbell Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'beginner',
  equipment: ['barbell'],
  muscles: ['biceps brachii', 'brachialis'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761075632/Firefly_Someone_performing_in_the_gym_46148_nokolx.jpg',
  instructions: [
    'Stand tall with feet hip-width apart, holding a barbell with an underhand grip.',
    'Keep elbows close to your torso and core engaged.',
    'Curl the barbell up towards your chest, leading with your elbows.',
    'Pause briefly at the top, squeezing the biceps.',
    'Slowly lower the barbell back to the starting position.'
  ],
  tips: [
    'Keep your elbows pinned to your sides throughout the movement.',
    'Control the bar on both the way up and down — avoid swinging.',
    'Squeeze your biceps hard at the top of each rep.'
  ],
  commonMistakes: [
    'Using momentum or swinging the torso to lift the weight.',
    'Letting elbows drift forward during the curl.',
    'Dropping the bar too quickly without controlling the eccentric phase.'
  ],
  variations: [
    'EZ-bar curls',
    'Seated barbell curls',
    'Reverse barbell curls'
  ]
},
{
  id: 'dumbbell-curl',
  name: 'Dumbbell Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'beginner',
  equipment: ['dumbbells'],
  muscles: ['biceps brachii', 'brachialis'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761075492/Firefly_Someone_performing_in_the_gym_in_a_plain_t_shirt_524487_dgkueb.jpg',
  instructions: [
    'Stand with a dumbbell in each hand, palms facing forward.',
    'Keep elbows close to your torso and core engaged.',
    'Curl the dumbbells up towards your shoulders, keeping wrists neutral.',
    'Pause and squeeze the biceps at the top.',
    'Slowly lower the weights back to start.'
  ],
tips: [
  'Keep your upper arms stationary and only move your forearms.',
  'Curl one or both dumbbells slowly, focusing on the squeeze at the top.',
  'Keep your wrists straight and avoid bending them backward.'
],
commonMistakes: [
  'Swinging the dumbbells or using momentum.',
  'Letting elbows drift forward during the curl.',
  'Not controlling the lowering phase.'
],
variations: [
  'Alternating dumbbell curls',
  'Seated dumbbell curls',
  'Incline dumbbell curls'
]
},  
    
{
  id: 'hammer-curl',
  name: 'Hammer Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'beginner',
  equipment: ['dumbbells'],
  muscles: ['biceps brachii', 'brachialis', 'brachioradialis'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761075273/Firefly_Someone_performing_in_the_gym_636837_2_bnq35z.jpg',
  instructions: [
    'Stand with a dumbbell in each hand, palms facing each other.',
    'Keep elbows close to your torso and core engaged.',
    'Curl the dumbbells up while maintaining the neutral grip (thumbs up).',
    'Pause and squeeze at the top, then slowly lower to start.'
  ],
tips: [
  'Keep your palms facing each other throughout the movement.',
  'Control the dumbbells on both the lift and the descent.',
  'Squeeze your biceps and forearms at the top of each rep.'
],
commonMistakes: [
  'Swinging the weights or using body momentum.',
  'Letting elbows drift away from your sides.',
  'Rotating wrists or turning the palms upward.'
],
variations: [
  'Alternating hammer curls',
  'Cross-body hammer curls',
  'Rope hammer curls on cable machine'
]
},  

{
  id: 'concentration-curl',
  name: 'Concentration Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'intermediate',
  equipment: ['dumbbell', 'bench'],
  muscles: ['biceps brachii'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761075185/Firefly_Someone_performing_in_the_gym_706422_5_yxkphx.jpg',
  instructions: [
    'Sit on a bench with legs apart, holding a dumbbell in one hand.',
    'Rest the back of your upper arm on the inner thigh.',
    'Curl the dumbbell towards your shoulder, focusing on bicep contraction.',
    'Pause at the top, then slowly lower to start.'
  ],
tips: [
  'Sit on a bench and brace your elbow against the inside of your thigh.',
  'Curl the dumbbell slowly, focusing on squeezing the bicep at the top.',
  'Lower the weight under control without letting your arm swing.'
],
commonMistakes: [
  'Using momentum to lift the dumbbell.',
  'Lifting the elbow off the thigh for extra leverage.',
  'Not controlling the lowering phase.'
],
variations: [
  'Standing concentration curl',
  'Cable concentration curl',
  'Seated alternating concentration curl'
]
},  

{
  id: 'preacher-curl',
  name: 'Preacher Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'intermediate',
  equipment: ['preacher bench', 'barbell or dumbbell'],
  muscles: ['biceps brachii'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761075112/Firefly_Someone_performing_in_the_gym_706422_4_u3qd9y.jpg',
  instructions: [
    'Sit on a preacher bench, resting upper arms on the pad.',
    'Hold barbell or dumbbells with an underhand grip.',
    'Curl weight towards shoulders, pause at top, then slowly lower.'
  ],
tips: [
  'Keep your upper arms flat against the pad throughout the movement.',
  'Lower the bar slowly to feel a full stretch in the biceps.',
  'Squeeze your biceps hard at the top before lowering the weight.'
],
commonMistakes: [
  'Lifting the elbows off the pad during the curl.',
  'Using momentum to swing the weight up.',
  'Not completing the full range of motion.'
],
variations: [
  'Dumbbell preacher curl',
  'EZ-bar preacher curl',
  'Machine preacher curl'
]
},  

{
  id: 'incline-dumbbell-curl',
  name: 'Incline Dumbbell Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'intermediate',
  equipment: ['dumbbells', 'incline bench'],
  muscles: ['biceps brachii', 'brachialis'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761075022/Firefly_Someone_performing_in_the_gym_706422_3_upp2sh.jpg',
  instructions: [
    'Lie back on an incline bench holding a dumbbell in each hand, arms hanging down.',
    'Keep palms facing forward.',
    'Curl dumbbells towards shoulders, pause at top, then slowly lower.'
  ],
tips: [
  'Keep your back flat against the bench and elbows tucked close to your sides.',
  'Let your arms hang fully extended at the bottom for a full stretch.',
  'Curl the dumbbells slowly and avoid swinging them.'
],
commonMistakes: [
  'Lifting the shoulders off the bench during the curl.',
  'Using momentum or swinging the dumbbells.',
  'Not fully extending the arms at the bottom of the movement.'
],
variations: [
  'Alternating incline dumbbell curl',
  'Twisting (supinating) incline dumbbell curl',
  'Incline hammer curl'
]
},  

{
  id: 'cable-curl',
  name: 'Cable Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'intermediate',
  equipment: ['cable machine', 'straight bar attachment'],
  muscles: ['biceps brachii'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761074953/Firefly_Someone_performing_in_the_gym_636837_1_x8bvyq.jpg',
  instructions: [
    'Attach a straight bar to a low pulley cable.',
    'Stand tall with feet hip-width apart, hold bar with underhand grip.',
    'Curl bar towards shoulders, pause at top, then slowly lower.'
  ],
tips: [
  'Stand tall with your core engaged and elbows pinned to your sides.',
  'Control the cable both up and down to keep constant tension on your biceps.',
  'Squeeze your biceps at the top before slowly lowering the handle.'
],
commonMistakes: [
  'Leaning back or using your shoulders to lift the weight.',
  'Letting the cable snap back without control.',
  'Allowing elbows to drift forward or upward during the curl.'
],
variations: [
  'Single-arm cable curl',
  'Rope attachment cable curl',
  'Overhead cable curl'
]
},  

{
  id: 'ez-bar-curl',
  name: 'EZ Bar Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'beginner',
  equipment: ['EZ bar'],
  muscles: ['biceps brachii', 'brachialis'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761074869/Firefly_Someone_performing_in_the_gym_706422_2_gdudty.jpg',
  instructions: [
    'Stand tall holding an EZ bar with an underhand grip.',
    'Keep elbows close to torso.',
    'Curl the bar towards shoulders, pause at top, then lower slowly.'
  ],
tips: [
  'Grip the EZ bar with your preferred angle (narrow or wide) for comfort and focus.',
  'Keep your elbows tight to your sides and avoid swinging your torso.',
  'Control the bar throughout the movement, especially on the way down.'
],
commonMistakes: [
  'Using momentum or leaning back to lift the bar.',
  'Letting elbows drift forward during the curl.',
  'Not fully extending the arms at the bottom.'
],
variations: [
  'Seated EZ bar curl',
  'Reverse EZ bar curl',
  'Preacher EZ bar curl'
]
},  

{
  id: 'zottman-curl',
  name: 'Zottman Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'intermediate',
  equipment: ['dumbbells'],
  muscles: ['biceps brachii', 'brachialis', 'forearms'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761074808/Firefly_Someone_performing_in_the_gym_706422_1_sbv4jd.jpg',
  instructions: [
    'Stand holding a dumbbell in each hand with palms facing forward.',
    'Curl dumbbells up toward shoulders.',
    'At the top, rotate wrists so palms face down.',
    'Lower dumbbells slowly in this pronated position.'
  ],
tips: [
  'Curl the dumbbells up with a standard supinated (palms-up) grip.',
  'At the top, rotate your wrists so your palms face down before lowering the weight.',
  'Lower the dumbbells slowly to emphasize forearm engagement.'
],
commonMistakes: [
  'Rotating the wrists too early or inconsistently.',
  'Using momentum instead of controlled movement.',
  'Not fully extending the arms at the bottom of the rep.'
],
variations: [
  'Seated Zottman curl',
  'Alternating Zottman curl',
  'Cable Zottman curl'
]
},  

{
  id: 'reverse-curl',
  name: 'Reverse Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'beginner',
  equipment: ['barbell', 'EZ bar', 'dumbbells'],
  muscles: ['brachialis', 'biceps brachii', 'forearms'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761074731/Firefly_Someone_performing_in_the_gym_636837_rua0bf.jpg',
  instructions: [
    'Stand holding a barbell with an overhand grip, hands shoulder-width apart.',
    'Keep elbows close to torso.',
    'Curl the bar towards shoulders, pause, then lower slowly.'
  ],
tips: [
  'Use an overhand (pronated) grip to target the forearms and brachialis.',
  'Keep your elbows close to your sides and your wrists straight throughout the movement.',
  'Lift and lower the bar under control without swinging.'
],
commonMistakes: [
  'Using momentum or swinging the bar up.',
  'Letting wrists bend backward during the curl.',
  'Not controlling the eccentric (lowering) phase.'
],
variations: [
  'EZ bar reverse curl',
  'Dumbbell reverse curl',
  'Cable reverse curl'
]
},  

{
  id: 'spider-curl',
  name: 'Spider Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'intermediate',
  equipment: ['dumbbells', 'bench'],
  muscles: ['biceps brachii'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761074618/Firefly_Someone_performing_in_the_gym_706422_e74p1m.jpg',
  instructions: [
    'Lie face down on an incline bench, arms hanging straight down holding dumbbells.',
    'Curl dumbbells toward shoulders, pause, then lower slowly.'
  ],
tips: [
  'Position your chest against the bench and let your arms hang straight down.',
  'Curl the weight up slowly, focusing on squeezing your biceps at the top.',
  'Keep your upper arms stationary and avoid swinging.'
],
commonMistakes: [
  'Using momentum to lift the weight.',
  'Letting elbows move away from the starting position.',
  'Dropping the weight too quickly without control.'
],
variations: [
  'Dumbbell spider curl',
  'EZ bar spider curl',
  'Cable spider curl'
]
},  

{
  id: 'drag-curl',
  name: 'Drag Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'intermediate',
  equipment: ['barbell', 'EZ bar', 'dumbbells'],
  muscles: ['biceps brachii'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761074490/Firefly_Someone_performing_in_the_gym_in_a_plain_vest_636837_tjegpy.jpg',
  instructions: [
    'Hold a barbell with an underhand grip, elbows close to torso.',
    'Curl bar up by dragging it along the torso, keeping elbows back.',
    'Pause at top, then lower slowly.'
  ],
tips: [
  'Keep the barbell close to your body and drag it up along your torso as you curl.',
  'Focus on pulling your elbows back rather than raising them forward.',
  'Squeeze your biceps hard at the top before lowering the bar under control.'
],
commonMistakes: [
  'Letting elbows drift forward like a standard curl.',
  'Using momentum or leaning back to lift the weight.',
  'Not keeping the bar close to the body throughout the movement.'
],
variations: [
  'Dumbbell drag curl',
  'EZ bar drag curl',
  'Cable drag curl'
]
},  

{
  id: 'cross-body-dumbbell-curl',
  name: 'Cross-Body Dumbbell Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'beginner',
  equipment: ['dumbbells'],
  muscles: ['biceps brachii', 'brachialis'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761074336/Firefly_Someone_performing_in_the_gym_844850_10_lao0cd.jpg',
  instructions: [
    'Stand holding a dumbbell in one hand, palm facing inward.',
    'Curl dumbbell across body toward opposite shoulder.',
    'Pause at top, then lower slowly.',
    'Repeat for other arm.'
  ],
tips: [
  'Hold a dumbbell in each hand with palms facing your body (neutral grip).',
  'Curl one dumbbell across your body toward the opposite shoulder.',
  'Keep your elbows tucked and control the movement through the full range of motion.'
],
commonMistakes: [
  'Swinging the dumbbell or using body momentum.',
  'Letting elbows flare out from the sides.',
  'Not fully lowering the dumbbell after each rep.'
],
variations: [
  'Seated cross-body dumbbell curl',
  'Alternating cross-body curl',
  'Cable cross-body curl'
]
},  

{
  id: 'one-arm-cable-curl',
  name: 'One-Arm Cable Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'intermediate',
  equipment: ['cable machine', 'single handle attachment'],
  muscles: ['biceps brachii'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761074227/Firefly_Someone_performing_in_the_gym_337653_7_qe1tlm.jpg',
  instructions: [
    'Attach handle to low pulley, grab with one hand, stand tall.',
    'Keep elbow close to torso.',
    'Curl handle toward shoulder, pause, then lower slowly.',
    'Repeat on opposite arm.'
  ],
tips: [
  'Stand side-on to the cable machine and grab the handle with an underhand grip.',
  'Keep your elbow close to your side and curl the handle toward your shoulder.',
  'Control the movement both up and down to maintain constant tension on the bicep.'
],
commonMistakes: [
  'Letting the elbow move forward or away from the body.',
  'Using momentum or twisting the torso to lift the weight.',
  'Allowing the cable to snap back too quickly.'
],
variations: [
  'Overhead single-arm cable curl',
  'Kneeling single-arm cable curl',
  'Cross-body single-arm cable curl'
]
},  

{
  id: 'machine-bicep-curl',
  name: 'Machine Bicep Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'beginner',
  equipment: ['bicep curl machine'],
  muscles: ['biceps brachii'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761074109/Firefly_Someone_performing_in_the_gym_967618_5_pijjxj.jpg',
  instructions: [
    'Sit on the machine and adjust seat so elbows rest comfortably on pad.',
    'Grasp handles with underhand grip.',
    'Curl handles towards shoulders, pause, then slowly lower.'
  ],
tips: [
  'Adjust the seat so your elbows align with the machine’s pivot point.',
  'Grip the handles firmly and keep your upper arms stationary against the pad.',
  'Curl the handles smoothly and squeeze your biceps at the top before lowering slowly.'
],
commonMistakes: [
  'Lifting the elbows off the pad during the curl.',
  'Using momentum or jerking the handles up.',
  'Not controlling the eccentric (lowering) phase.'
],
variations: [
  'Single-arm machine bicep curl',
  'Preacher-style machine curl',
  'Cable machine bicep curl'
]
},  

{
  id: 'overhead-cable-curl',
  name: 'Overhead Cable Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'intermediate',
  equipment: ['cable machine', 'high pulley'],
  muscles: ['biceps brachii'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761073974/Firefly_Someone_performing_in_the_gym_844850_9_z0uo6h.jpg',
  instructions: [
    'Attach handles to high pulleys and stand in the center.',
    'Grasp handles with palms facing forward, arms extended above head.',
    'Curl handles downward toward shoulders, pause, then slowly return to start.'
  ],
tips: [
  'Stand in the center of a dual cable station with arms extended out to the sides.',
  'Keep your upper arms parallel to the floor and curl the handles toward your head.',
  'Squeeze your biceps at the peak contraction before slowly returning to the start.'
],
commonMistakes: [
  'Dropping the elbows or letting them move during the curl.',
  'Using momentum or arching the back.',
  'Not controlling the movement on the way down.'
],
variations: [
  'Single-arm overhead cable curl',
  'Kneeling overhead cable curl',
  'High pulley rope curl'
]
},  

{
  id: 'seated-dumbbell-curl',
  name: 'Seated Dumbbell Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'beginner',
  equipment: ['dumbbells', 'bench'],
  muscles: ['biceps brachii', 'brachialis'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761073753/Firefly_Someone_performing_in_the_gym_109755_4_r3vqre.jpg',
  instructions: [
    'Sit on a bench holding a dumbbell in each hand, palms facing forward.',
    'Keep back straight and core engaged.',
    'Curl dumbbells toward shoulders, pause, then lower slowly.'
  ],
tips: [
  'Sit upright with your back flat against the bench and feet planted firmly.',
  'Keep your elbows tucked to your sides and curl the dumbbells slowly.',
  'Focus on squeezing the biceps at the top and control the lowering phase.'
],
commonMistakes: [
  'Leaning back or swinging the dumbbells.',
  'Letting elbows drift away from your sides.',
  'Not fully extending the arms at the bottom.'
],
variations: [
  'Alternating seated dumbbell curl',
  'Incline seated dumbbell curl',
  'Seated hammer curl'
]
},  

{
  id: 'standing-dumbbell-curl',
  name: 'Standing Dumbbell Curl',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'beginner',
  equipment: ['dumbbells'],
  muscles: ['biceps brachii', 'brachialis'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761073602/Firefly_Someone_performing_in_the_gym_337653_6_xmdi6q.jpg',
  instructions: [
    'Stand holding a dumbbell in each hand, palms facing forward.',
    'Keep elbows close to torso and core tight.',
    'Curl dumbbells toward shoulders, pause at top, then lower slowly.'
  ],
tips: [
  'Stand tall with feet shoulder-width apart and core engaged.',
  'Keep your elbows close to your sides and curl the dumbbells in a controlled manner.',
  'Squeeze your biceps at the top and lower the weights slowly.'
],
commonMistakes: [
  'Swinging the dumbbells or using momentum.',
  'Allowing elbows to drift forward or outward.',
  'Not controlling the eccentric phase of the curl.'
],
variations: [
  'Alternating standing dumbbell curl',
  'Hammer curl',
  'Zottman curl'
]
},  

{
  id: 'chin-ups',
  name: 'Chin-Ups',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'intermediate',
  equipment: ['pull-up bar'],
  muscles: ['biceps brachii', 'latissimus dorsi'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761073483/Firefly_Someone_performing_in_the_gym_967618_4_stewt8.jpg',
  instructions: [
    'Grasp pull-up bar with underhand grip, hands shoulder-width apart.',
    'Hang with arms fully extended.',
    'Pull body up until chin is above the bar.',
    'Lower slowly to start.'
  ],
tips: [
  'Grip the bar with palms facing you (underhand grip) and hands shoulder-width apart.',
  'Engage your back and biceps, pulling your chest toward the bar.',
  'Lower yourself slowly and fully extend your arms at the bottom.'
],
commonMistakes: [
  'Kicking or swinging the legs to gain momentum.',
  'Not fully extending the arms at the bottom.',
  'Letting the shoulders shrug or collapse during the movement.'
],
variations: [
  'Weighted chin-ups',
  'Assisted chin-ups with band',
  'Neutral-grip chin-ups'
]
},  

{
  id: 'barbell-21s',
  name: 'Barbell 21s',
  category: 'arms',
  subCategory: 'biceps',
  difficulty: 'intermediate',
  equipment: ['barbell'],
  muscles: ['biceps brachii', 'brachialis'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761073407/Firefly_Someone_performing_in_the_gym_844850_8_utmtpa.jpg',
  instructions: [
    'Hold barbell with underhand grip, elbows close to torso.',
    'Perform 7 partial reps from bottom to midpoint.',
    'Perform 7 partial reps from midpoint to top.',
    'Perform 7 full-range reps from bottom to top.'
  ],
tips: [
  'Keep your elbows close to your sides',
  'Use a controlled tempo for each range',
  'Maintain tension through all 21 reps'
],
commonMistakes: [
  'Using momentum to lift',
  'Not completing full or partial ranges properly',
  'Letting elbows drift forward'
],
variations: [
  'Dumbbell 21s',
  'Cable 21s'
]
},
{
  id: 'close-grip-bench-press',
  name: 'Close-Grip Bench Press',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'intermediate',
  equipment: ['bench', 'barbell'],
  muscles: ['triceps', 'chest', 'front delts'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761073206/Firefly_Someone_performing_in_the_gym_337653_5_gbqjt6.jpg',
  instructions: [
    'Lie on a flat bench with feet planted firmly',
    'Grip the barbell slightly narrower than shoulder width',
    'Unrack the bar and lower it slowly to the middle of your chest',
    'Press the bar back up while keeping elbows tucked in'
  ],
  tips: [
    'Keep elbows close to body',
    'Do not flare arms outward',
    'Control the bar throughout'
  ],
  commonMistakes: [
    'Using too wide of a grip',
    'Letting elbows flare',
    'Arching the back excessively'
  ],
  variations: [
    'Close-grip push-ups',
    'Smith machine close-grip press'
  ]
},

{
  id: 'tricep-dips',
  name: 'Tricep Dips',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'intermediate',
  equipment: ['parallel bars'],
  muscles: ['triceps', 'chest', 'front delts'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761073071/Firefly_Someone_performing_in_the_gym_844850_7_xma23n.jpg',
  instructions: [
    'Grasp parallel bars and lift body up',
    'Lower yourself by bending elbows until arms are at 90 degrees',
    'Push yourself back up to the starting position'
  ],
  tips: [
    'Keep torso upright to target triceps more',
    'Lower under control',
    'Lock out gently at the top'
  ],
  commonMistakes: [
    'Going too low and straining shoulders',
    'Leaning forward excessively',
    'Shrugging shoulders'
  ],
  variations: [
    'Bench dips',
    'Weighted dips'
  ]
},

{
  id: 'diamond-push-ups',
  name: 'Diamond Push-Ups',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'beginner',
  equipment: ['none'],
  muscles: ['triceps', 'chest', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761072915/Firefly_Someone_performing_in_the_gym_844850_6_a9jm4r.jpg',
  instructions: [
    'Start in a push-up position',
    'Place hands close together, forming a diamond shape with thumbs and index fingers',
    'Lower chest towards hands while keeping elbows close',
    'Push back up to starting position'
  ],
  tips: [
    'Keep core engaged',
    'Do not flare elbows outward',
    'Move slowly for control'
  ],
  commonMistakes: [
    'Letting hips sag',
    'Hands too far apart',
    'Rushing reps'
  ],
  variations: [
    'Incline diamond push-ups',
    'Decline diamond push-ups'
  ]
},

{
  id: 'skull-crushers',
  name: 'Skull Crushers',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'intermediate',
  equipment: ['bench', 'ez bar'],
  muscles: ['triceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761072811/Firefly_Someone_performing_in_the_gym_967618_2_tgf6bn.jpg',
  instructions: [
    'Lie on a flat bench holding an EZ bar with a narrow grip',
    'Extend arms straight up above chest',
    'Slowly bend elbows to lower bar towards forehead',
    'Press bar back up to starting position'
  ],
  tips: [
    'Keep elbows fixed in place',
    'Use a controlled motion',
    'Avoid locking elbows fully at the top'
  ],
  commonMistakes: [
    'Flaring elbows outward',
    'Dropping weight too quickly',
    'Moving shoulders instead of just elbows'
  ],
  variations: [
    'Dumbbell skull crushers',
    'Cable skull crushers'
  ]
},

{
  id: 'overhead-dumbbell-extension',
  name: 'Overhead Dumbbell Extension',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'beginner',
  equipment: ['dumbbell'],
  muscles: ['triceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761072726/Firefly_Someone_performing_in_the_gym_109755_3_jfercy.jpg',
  instructions: [
    'Sit or stand holding a dumbbell with both hands above head',
    'Lower the dumbbell behind your head by bending elbows',
    'Extend arms back to starting position'
  ],
  tips: [
    'Keep elbows close to ears',
    'Maintain upright posture',
    'Avoid arching lower back'
  ],
  commonMistakes: [
    'Letting elbows flare outward',
    'Using too heavy of a weight',
    'Not using full range of motion'
  ],
  variations: [
    'Seated dumbbell overhead extension',
    'Single-arm overhead dumbbell extension'
  ]
},

{
  id: 'overhead-barbell-extension',
  name: 'Overhead Barbell Extension',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'intermediate',
  equipment: ['barbell'],
  muscles: ['triceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761072630/Firefly_Someone_performing_in_the_gym_109755_2_zstlop.jpg',
  instructions: [
    'Hold a barbell overhead with a narrow grip',
    'Bend elbows to lower the bar behind head',
    'Extend arms fully back overhead'
  ],
  tips: [
    'Keep elbows tucked in',
    'Control the descent',
    'Do not arch back excessively'
  ],
  commonMistakes: [
    'Using too much weight',
    'Letting elbows flare',
    'Shortening range of motion'
  ],
  variations: [
    'EZ bar overhead extension',
    'Seated barbell overhead extension'
  ]
},

{
  id: 'overhead-cable-extension',
  name: 'Overhead Cable Extension',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'intermediate',
  equipment: ['cable machine'],
  muscles: ['triceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761072503/Firefly_Someone_performing_in_the_gym_967618_1_avc0ft.jpg',
  instructions: [
    'Attach a rope to low pulley and face away from the machine',
    'Grab the rope with both hands and extend arms overhead',
    'Bend elbows to lower rope behind head',
    'Extend arms back overhead'
  ],
  tips: [
    'Keep elbows close together',
    'Stand with staggered stance for balance',
    'Move only forearms'
  ],
  commonMistakes: [
    'Leaning too far forward',
    'Letting elbows drift apart',
    'Using momentum'
  ],
  variations: [
    'Single-arm overhead cable extension',
    'Seated overhead cable extension'
  ]
},

{
  id: 'rope-pushdowns',
  name: 'Rope Pushdowns',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'beginner',
  equipment: ['cable machine'],
  muscles: ['triceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761072096/Firefly_Someone_performing_in_the_gym_overhand_967618_1_wpwysg.jpg',
  instructions: [
    'Attach rope handle to high pulley',
    'Grab rope with both hands, elbows tucked to sides',
    'Push rope downward until arms are fully extended',
    'Return slowly to starting position'
  ],
  tips: [
    'Spread rope ends apart at bottom',
    'Keep elbows stationary',
    'Do not lean forward excessively'
  ],
  commonMistakes: [
    'Swinging body',
    'Letting elbows move forward',
    'Using too much weight'
  ],
  variations: [
    'Single-arm rope pushdown',
    'Reverse grip rope pushdown'
  ]
},

{
  id: 'straight-bar-pushdowns',
  name: 'Straight Bar Pushdowns',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'beginner',
  equipment: ['cable machine'],
  muscles: ['triceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761071030/Firefly_Someone_performing_in_the_gym_overhand_967618_mw8rjq.jpg',
  instructions: [
    'Attach straight bar to high pulley',
    'Grab bar with overhand grip, elbows tucked to sides',
    'Push bar downward until arms are fully extended',
    'Return bar slowly upward'
  ],
  tips: [
    'Keep elbows pinned at sides',
    'Do not lock elbows at bottom',
    'Control the motion'
  ],
  commonMistakes: [
    'Rocking body for momentum',
    'Allowing elbows to drift',
    'Using too much weight'
  ],
  variations: [
    'V-bar pushdowns',
    'Rope pushdowns'
  ]
},

{
  id: 'reverse-grip-pushdowns',
  name: 'Reverse Grip Pushdowns',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'intermediate',
  equipment: ['cable machine'],
  muscles: ['triceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761070809/Firefly_Someone_performing_in_the_gym_109755_1_cnssnp.jpg',
  instructions: [
    'Attach straight bar to high pulley',
    'Grab bar with underhand grip, elbows tucked in',
    'Push bar down until arms are fully extended',
    'Return bar slowly upward'
  ],
  tips: [
    'Use lighter weight for better form',
    'Keep wrists straight',
    'Focus on contraction at bottom'
  ],
  commonMistakes: [
    'Overloading weight',
    'Bending wrists',
    'Moving shoulders instead of just elbows'
  ],
  variations: [
    'Rope pushdowns',
    'Single-arm reverse grip pushdowns'
  ]
},
{
  id: 'kickbacks',
  name: 'Kickbacks',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'beginner',
  equipment: ['dumbbell'],
  muscles: ['triceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761070735/Firefly_Someone_performing_in_the_gym_967618_i1igj9.jpg',
  instructions: [
    'Hold a dumbbell in one hand and hinge forward at the hips',
    'Keep upper arm close to torso and bend elbow to 90 degrees',
    'Extend arm backward until fully straight',
    'Return slowly to starting position'
  ],
  tips: [
    'Keep back flat and core engaged',
    'Only forearm should move',
    'Squeeze triceps at the top'
  ],
  commonMistakes: [
    'Swinging the weight',
    'Dropping elbow down',
    'Using momentum'
  ],
  variations: [
    'Cable kickbacks',
    'Incline bench kickbacks'
  ]
},

{
  id: 'jm-press',
  name: 'JM Press',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'advanced',
  equipment: ['barbell', 'bench'],
  muscles: ['triceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761070666/Firefly_Someone_performing_in_the_gym_337653_4_pqtur7.jpg',
  instructions: [
    'Lie on a flat bench holding a barbell with narrow grip',
    'Lower bar towards chin by bending elbows',
    'Pause briefly, then extend arms back up'
  ],
  tips: [
    'Keep elbows tucked in',
    'Lower under control',
    'Use moderate weight to maintain form'
  ],
  commonMistakes: [
    'Turning it into a skull crusher',
    'Letting elbows flare',
    'Bouncing bar off chest'
  ],
  variations: [
    'Smith machine JM press',
    'EZ bar JM press'
  ]
},

{
  id: 'tate-press',
  name: 'Tate Press',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'advanced',
  equipment: ['dumbbells', 'bench'],
  muscles: ['triceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761070571/Firefly_Someone_performing_in_the_gym_844850_5_kplimu.jpg',
  instructions: [
    'Lie flat on a bench holding dumbbells above chest with palms facing feet',
    'Bend elbows outward, lowering dumbbells towards chest',
    'Press dumbbells back to starting position'
  ],
  tips: [
    'Keep movements controlled',
    'Focus on elbow bend, not shoulder movement',
    'Use lighter weight to start'
  ],
  commonMistakes: [
    'Letting arms drift out of position',
    'Dropping weights too quickly',
    'Using too heavy of a load'
  ],
  variations: [
    'Incline bench Tate press',
    'Barbell variation'
  ]
},

{
  id: 'floor-press',
  name: 'Floor Press',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'intermediate',
  equipment: ['barbell'],
  muscles: ['triceps', 'chest'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761070503/Firefly_Someone_performing_in_the_gym_337653_3_wu61bk.jpg',
  instructions: [
    'Lie flat on the floor holding barbell over chest',
    'Lower barbell until upper arms touch floor',
    'Press barbell back up to starting position'
  ],
  tips: [
    'Keep elbows at 45-degree angle',
    'Pause at bottom for control',
    'Maintain tight core'
  ],
  commonMistakes: [
    'Bouncing arms off floor',
    'Flaring elbows out',
    'Overarching back'
  ],
  variations: [
    'Dumbbell floor press',
    'Smith machine floor press'
  ]
},

{
  id: 'bench-dip',
  name: 'Bench Dip',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'beginner',
  equipment: ['bench'],
  muscles: ['triceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761070333/Firefly_Someone_performing_in_the_gym_337653_2_tm1r6z.jpg',
  instructions: [
    'Sit on bench with hands gripping edge beside hips',
    'Move feet forward and slide hips off bench',
    'Lower body by bending elbows to 90 degrees',
    'Press back up to extend arms'
  ],
  tips: [
    'Keep elbows pointing straight back',
    'Feet closer = easier, feet further = harder',
    'Do not dip too low'
  ],
  commonMistakes: [
    'Flaring elbows',
    'Lowering shoulders too far',
    'Using legs to push'
  ],
  variations: [
    'Weighted bench dips',
    'Feet elevated bench dips'
  ]
},

{
  id: 'close-grip-push-up',
  name: 'Close-Grip Push-Up',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'beginner',
  equipment: ['none'],
  muscles: ['triceps', 'chest', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761070255/Firefly_Someone_performing_in_the_gym_844850_4_a4zp8d.jpg',
  instructions: [
    'Start in a push-up position with hands close together under chest',
    'Lower body while keeping elbows close to sides',
    'Push back up until arms are extended'
  ],
  tips: [
    'Keep body straight',
    'Do not flare elbows outward',
    'Brace core for stability'
  ],
  commonMistakes: [
    'Letting hips sag',
    'Hands too wide apart',
    'Incomplete range of motion'
  ],
  variations: [
    'Diamond push-ups',
    'Incline close-grip push-ups'
  ]
},

{
  id: 'one-arm-overhead-dumbbell-extension',
  name: 'One-Arm Overhead Dumbbell Extension',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'intermediate',
  equipment: ['dumbbell'],
  muscles: ['triceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761070183/Firefly_Someone_performing_in_the_gym_109755_zne1rs.jpg',
  instructions: [
    'Hold a dumbbell in one hand and raise it overhead',
    'Bend elbow to lower dumbbell behind head',
    'Extend arm back overhead'
  ],
  tips: [
    'Keep upper arm close to ear',
    'Maintain upright posture',
    'Perform slowly for control'
  ],
  commonMistakes: [
    'Letting elbow drift outward',
    'Arching lower back',
    'Using momentum'
  ],
  variations: [
    'Seated single-arm overhead extension',
    'Cable one-arm overhead extension'
  ]
},

{
  id: 'cable-crossbody-extension',
  name: 'Cable Crossbody Extension',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'intermediate',
  equipment: ['cable machine'],
  muscles: ['triceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761070081/Firefly_Someone_performing_in_the_gym_with_resistance_bands_337653_2_lpykuj.jpg',
  instructions: [
    'Set cable at shoulder height with a single handle',
    'Grab handle with one hand and pull across body by extending elbow',
    'Return slowly to starting position'
  ],
  tips: [
    'Keep elbow fixed at side',
    'Stand tall and stable',
    'Focus on squeezing triceps at full extension'
  ],
  commonMistakes: [
    'Rotating torso',
    'Moving shoulder excessively',
    'Using momentum'
  ],
  variations: [
    'Rope crossbody extension',
    'Overhead cable extension'
  ]
},

{
  id: 'smith-machine-close-grip-bench',
  name: 'Smith Machine Close-Grip Bench',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'intermediate',
  equipment: ['smith machine', 'bench'],
  muscles: ['triceps', 'chest', 'front delts'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761070007/Firefly_Someone_performing_in_the_gym_with_resistance_bands_337653_1_zlnkuu.jpg',
  instructions: [
    'Lie on a bench under Smith machine bar',
    'Grip bar slightly narrower than shoulder width',
    'Lower bar to mid chest while keeping elbows tucked',
    'Press bar back up to starting position'
  ],
  tips: [
    'Keep wrists straight',
    'Do not flare elbows',
    'Engage triceps at lockout'
  ],
  commonMistakes: [
    'Using too much weight',
    'Arching back excessively',
    'Bouncing bar off chest'
  ],
  variations: [
    'Free weight close-grip bench',
    'Dumbbell close-grip bench press'
  ]
},

{
  id: 'resistance-band-pushdowns',
  name: 'Resistance Band Pushdowns',
  category: 'arms',
  subCategory: 'triceps',
  difficulty: 'beginner',
  equipment: ['resistance band'],
  muscles: ['triceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761069868/Firefly_Someone_performing_in_the_gym_with_resistance_bands_337653_cssuyl.jpg',
  instructions: [
    'Anchor resistance band above head height',
    'Hold band with both hands, elbows tucked in',
    'Push band downward until arms are extended',
    'Return slowly to starting position'
  ],
  tips: [
    'Keep tension on band throughout',
    'Spread hands slightly at bottom',
    'Stand tall with core engaged'
  ],
  commonMistakes: [
    'Letting elbows drift forward',
    'Rushing reps',
    'Using too little resistance'
  ],
  variations: [
    'Single-arm band pushdowns',
    'Kneeling band pushdowns'
  ]
},
{
  id: 'wrist-curls',
  name: 'Wrist Curls',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'beginner',
  equipment: ['barbell', 'dumbbell'],
  muscles: ['forearms', 'wrist flexors'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761069589/Firefly_Someone_performing_in_the_gym_337653_1_du9m0n.jpg',
  instructions: [
    'Sit on a bench holding a barbell or dumbbells with palms facing upward',
    'Rest forearms on thighs with wrists hanging off edge',
    'Curl wrists upward as high as possible',
    'Lower slowly back down'
  ],
  tips: [
    'Keep forearms flat against thighs',
    'Use controlled motion',
    'Do not overextend wrist'
  ],
  commonMistakes: [
    'Using too much weight',
    'Lifting forearms off thighs',
    'Bouncing weight'
  ],
  variations: [
    'Seated dumbbell wrist curls',
    'Behind-the-back wrist curls'
  ]
},

{
  id: 'reverse-wrist-curls',
  name: 'Reverse Wrist Curls',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'beginner',
  equipment: ['barbell', 'dumbbell'],
  muscles: ['forearms', 'wrist extensors'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761069721/Firefly_Someone_with_muscles_performing_in_the_gym_967618_szj93r.jpg',
  instructions: [
    'Sit on a bench holding barbell or dumbbells with palms facing down',
    'Rest forearms on thighs with wrists hanging off edge',
    'Curl wrists upward',
    'Lower slowly back down'
  ],
  tips: [
    'Keep elbows still',
    'Use lighter weight to avoid strain',
    'Focus on contraction at top'
  ],
  commonMistakes: [
    'Rolling wrists too far',
    'Using momentum',
    'Forearms lifting off thighs'
  ],
  variations: [
    'Reverse dumbbell wrist curls',
    'Cable reverse wrist curls'
  ]
},

{
  id: 'hammer-curls',
  name: 'Hammer Curls',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'beginner',
  equipment: ['dumbbells'],
  muscles: ['biceps', 'brachialis', 'forearms'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761069436/Firefly_Someone_performing_in_the_gym_844850_3_tat25j.jpg',
  instructions: [
    'Stand holding dumbbells with palms facing each other',
    'Curl weights up while keeping palms neutral',
    'Lower dumbbells slowly back down'
  ],
  tips: [
    'Keep elbows close to body',
    'Lift in controlled motion',
    'Exhale during curl'
  ],
  commonMistakes: [
    'Swinging arms',
    'Using too heavy weight',
    'Letting elbows flare'
  ],
  variations: [
    'Incline hammer curls',
    'Cross-body hammer curls'
  ]
},

{
  id: 'reverse-curls',
  name: 'Reverse Curls',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'intermediate',
  equipment: ['barbell', 'ez bar'],
  muscles: ['forearms', 'brachioradialis', 'biceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761069362/Firefly_Someone_performing_in_the_gym_844850_2_qr0mb5.jpg',
  instructions: [
    'Stand holding barbell or EZ bar with palms facing down',
    'Curl bar upward while keeping elbows at sides',
    'Lower slowly back down'
  ],
  tips: [
    'Grip bar slightly narrower than shoulders',
    'Keep wrists straight',
    'Control weight throughout movement'
  ],
  commonMistakes: [
    'Bending wrists excessively',
    'Swinging bar up',
    'Elbows drifting forward'
  ],
  variations: [
    'Dumbbell reverse curls',
    'Cable reverse curls'
  ]
},

{
  id: 'zottman-curls',
  name: 'Zottman Curls',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'intermediate',
  equipment: ['dumbbells'],
  muscles: ['biceps', 'forearms'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761069264/Firefly_Someone_performing_in_the_gym_844850_1_ziyah8.jpg',
  instructions: [
    'Stand holding dumbbells with palms facing forward',
    'Curl weights up like a regular bicep curl',
    'Rotate wrists at top so palms face downward',
    'Lower dumbbells slowly in reverse curl motion'
  ],
  tips: [
    'Use moderate weight',
    'Control rotation at top',
    'Focus on slow negative phase'
  ],
  commonMistakes: [
    'Rushing through rotation',
    'Swinging arms',
    'Using too heavy weight'
  ],
  variations: [
    'Seated Zottman curls',
    'Incline Zottman curls'
  ]
},

{
  id: 'farmers-carries',
  name: 'Farmers Carries',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'intermediate',
  equipment: ['dumbbells', 'kettlebells'],
  muscles: ['forearms', 'grip', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761069058/Firefly_Someone_performing_in_the_gym_337653_lbyb14.jpg',
  instructions: [
    'Stand tall holding heavy dumbbells or kettlebells at sides',
    'Walk forward for designated distance',
    'Keep grip tight and posture upright'
  ],
  tips: [
    'Engage core for stability',
    'Take steady controlled steps',
    'Keep shoulders pulled back'
  ],
  commonMistakes: [
    'Hunching shoulders',
    'Letting weights bang against legs',
    'Using too light weight'
  ],
  variations: [
    'Single-arm farmers carry',
    'Overhead carry'
  ]
},

{
  id: 'plate-pinches',
  name: 'Plate Pinches',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'intermediate',
  equipment: ['weight plates'],
  muscles: ['forearms', 'grip'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761068965/Firefly_Someone_performing_in_the_gym_844850_p9ozo6.jpg',
  instructions: [
    'Hold two weight plates together smooth sides out with fingers and thumb',
    'Grip tightly and hold for time',
    'Release carefully'
  ],
  tips: [
    'Use smaller plates if grip fails quickly',
    'Squeeze hard with thumb',
    'Keep wrist neutral'
  ],
  commonMistakes: [
    'Letting plates slip',
    'Holding too light of weight',
    'Not engaging thumb fully'
  ],
  variations: [
    'Single plate pinch',
    'Two-hand plate pinches'
  ]
},

{
  id: 'towel-pull-ups',
  name: 'Towel Pull-Ups',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'advanced',
  equipment: ['pull-up bar', 'towels'],
  muscles: ['forearms', 'grip', 'lats', 'biceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761068803/Firefly_Someone_Using_Clothes_in_the_gym_99109_wpv587.jpg',
  instructions: [
    'Drape towels over pull-up bar and grip ends',
    'Perform pull-ups while gripping towels tightly',
    'Lower under control'
  ],
  tips: [
    'Squeeze towels hard',
    'Engage core for stability',
    'Start with fewer reps if grip fails early'
  ],
  commonMistakes: [
    'Using towels too thin or slippery',
    'Letting grip slip suddenly',
    'Incomplete pull-up range'
  ],
  variations: [
    'Single-arm towel pull-ups',
    'Mixed towel and bar pull-ups'
  ]
},

{
  id: 'dead-hangs',
  name: 'Dead Hangs',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'beginner',
  equipment: ['pull-up bar'],
  muscles: ['forearms', 'grip'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761068384/Firefly_Someone_performing_in_the_gym_909481_rb0ras.jpg',
  instructions: [
    'Grip pull-up bar with overhand grip',
    'Hang with arms fully extended',
    'Hold for designated time'
  ],
  tips: [
    'Keep shoulders slightly engaged',
    'Grip bar tightly',
    'Breathe steadily'
  ],
  commonMistakes: [
    'Letting shoulders completely disengage',
    'Swinging legs excessively',
    'Dropping off bar abruptly'
  ],
  variations: [
    'Mixed grip dead hangs',
    'Weighted dead hangs'
  ]
},

{
  id: 'rope-climbs',
  name: 'Rope Climbs',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'advanced',
  equipment: ['climbing rope'],
  muscles: ['forearms', 'grip', 'biceps', 'lats', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761068176/Firefly_Performing_in_the_gym_90469_3_zf6bxt.jpg',
  instructions: [
    'Grip rope with both hands and pull body upward',
    'Use legs to assist if necessary',
    'Climb up to designated height and descend carefully'
  ],
  tips: [
    'Keep grip tight',
    'Use legs for support if needed',
    'Control descent'
  ],
  commonMistakes: [
    'Sliding down too quickly',
    'Not engaging legs',
    'Overreliance on arms only'
  ],
  variations: [
    'Legless rope climbs',
    'Seated rope climbs'
  ]
},

{
  id: 'wrist-roller',
  name: 'Wrist Roller',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'intermediate',
  equipment: ['wrist roller', 'weights'],
  muscles: ['forearms', 'grip'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761068110/Firefly_Performing_in_the_gym_244536_2_mijsng.jpg',
  instructions: [
    'Hold wrist roller with both hands in front of body',
    'Roll weight up by rotating wrists forward',
    'Slowly roll weight back down'
  ],
  tips: [
    'Keep arms extended',
    'Use slow controlled rotations',
    'Focus on forearm contraction'
  ],
  commonMistakes: [
    'Using momentum',
    'Bending arms excessively',
    'Dropping weight quickly'
  ],
  variations: [
    'Behind-the-back wrist roller',
    'Single-arm wrist roller'
  ]
},

{
  id: 'behind-the-back-wrist-curls',
  name: 'Behind-the-Back Wrist Curls',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'intermediate',
  equipment: ['barbell'],
  muscles: ['forearms', 'wrist flexors'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761068049/Firefly_Performing_in_the_gym_244536_1_zujvsf.jpg',
  instructions: [
    'Stand holding barbell behind back with palms facing backward',
    'Allow barbell to roll down to fingers',
    'Curl wrists upward to lift barbell back up'
  ],
  tips: [
    'Keep arms straight and still',
    'Use lighter weight for better range',
    'Focus on full wrist flexion'
  ],
  commonMistakes: [
    'Shrugging shoulders',
    'Bouncing weight',
    'Overextending wrists'
  ],
  variations: [
    'Dumbbell behind-the-back wrist curls',
    'Smith machine behind-the-back curls'
  ]
},

{
  id: 'cable-wrist-curls',
  name: 'Cable Wrist Curls',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'intermediate',
  equipment: ['cable machine'],
  muscles: ['forearms'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761067983/Firefly_Performing_in_the_gym_90469_2_gecl3i.jpg',
  instructions: [
    'Attach straight bar to low pulley',
    'Grip bar with palms facing upward',
    'Sit on bench with forearms resting on thighs',
    'Curl wrists upward and lower slowly'
  ],
  tips: [
    'Keep forearms still',
    'Use full range of motion',
    'Breathe steadily'
  ],
  commonMistakes: [
    'Using too much weight',
    'Moving elbows',
    'Jerking the cable'
  ],
  variations: [
    'Reverse cable wrist curls',
    'Single-arm cable wrist curls'
  ]
},

{
  id: 'dumbbell-wrist-rotations',
  name: 'Dumbbell Wrist Rotations',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'beginner',
  equipment: ['dumbbell'],
  muscles: ['forearms', 'grip'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761067853/Firefly_Performing_in_the_gym_909481_uyczmz.jpg',
  instructions: [
    'Hold a dumbbell vertically by one end',
    'Rotate wrist slowly side to side',
    'Perform for desired reps'
  ],
  tips: [
    'Use light dumbbell',
    'Keep movements slow and controlled',
    'Do not over-rotate'
  ],
  commonMistakes: [
    'Using heavy weight',
    'Rushing motion',
    'Rotating from elbow instead of wrist'
  ],
  variations: [
    'Seated dumbbell rotations',
    'Hammer rotation with pronation and supination'
  ]
},

{
  id: 'lever-bar-rotations',
  name: 'Lever Bar Rotations',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'intermediate',
  equipment: ['lever bar'],
  muscles: ['forearms', 'wrist stabilizers'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761067772/Firefly_Performing_in_the_gym_90469_1_masohv.jpg',
  instructions: [
    'Hold lever bar with one hand near end',
    'Rotate wrist to move lever bar forward and backward',
    'Control movement slowly'
  ],
  tips: [
    'Choke up on bar for easier leverage',
    'Use slow motion for control',
    'Switch sides evenly'
  ],
  commonMistakes: [
    'Letting bar drop quickly',
    'Using arm instead of wrist',
    'Holding bar too far for strength level'
  ],
  variations: [
    'Two-handed lever bar rotations',
    'Side-to-side lever bar rotations'
  ]
},

{
  id: 'grip-crusher-training',
  name: 'Grip Crusher Training',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'beginner',
  equipment: ['hand grippers'],
  muscles: ['forearms', 'grip'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761067593/Firefly_Performing_in_the_gym_244536_anjrky.jpg',
  instructions: [
    'Hold grip crusher in hand with fingers wrapped around handle',
    'Squeeze handles together fully',
    'Release slowly'
  ],
  tips: [
    'Train both hands equally',
    'Hold contraction briefly at top',
    'Start with lower resistance'
  ],
  commonMistakes: [
    'Letting gripper snap open',
    'Training only dominant hand',
    'Using partial range'
  ],
  variations: [
    'Captains of Crush grippers',
    'Extended hold grip squeezes'
  ]
},

{
  id: 'fat-grip-barbell-holds',
  name: 'Fat Grip Barbell Holds',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'advanced',
  equipment: ['barbell', 'fat grips'],
  muscles: ['forearms', 'grip'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761067477/Firefly_Performing_in_the_gym_90469_i9kuwd.jpg',
  instructions: [
    'Attach fat grips to barbell',
    'Lift and hold barbell at thighs',
    'Maintain grip for time'
  ],
  tips: [
    'Start with lighter weight',
    'Keep posture upright',
    'Hold until near failure'
  ],
  commonMistakes: [
    'Using excessive weight',
    'Dropping bar suddenly',
    'Letting grip slip too early'
  ],
  variations: [
    'Dumbbell fat grip holds',
    'Pull-up bar fat grip hangs'
  ]
},

{
  id: 'towel-grip-rows',
  name: 'Towel Grip Rows',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'intermediate',
  equipment: ['cable machine', 'towel'],
  muscles: ['forearms', 'grip', 'back'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761067265/Firefly_Performing_in_the_gym_holding_onto_a_towel_188140_zuyetv.jpg',
  instructions: [
    'Attach towel to cable row handle',
    'Grip towel ends and sit on row bench',
    'Row towel toward torso by pulling elbows back',
    'Return slowly to start'
  ],
  tips: [
    'Squeeze towel tight',
    'Keep back straight',
    'Use full range of motion'
  ],
  commonMistakes: [
    'Hunching forward',
    'Jerking weight back',
    'Letting towel slip'
  ],
  variations: [
    'One-arm towel rows',
    'Dumbbell towel rows'
  ]
},

{
  id: 'barbell-holds',
  name: 'Barbell Holds',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'intermediate',
  equipment: ['barbell'],
  muscles: ['forearms', 'grip'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761067015/Firefly_Performing_in_the_gym_209853_4_yqphcr.jpg',
  instructions: [
    'Lift barbell to standing position',
    'Hold barbell securely in hands for time',
    'Lower barbell carefully'
  ],
  tips: [
    'Keep posture tall',
    'Start with moderate weight',
    'Time your holds consistently'
  ],
  commonMistakes: [
    'Rounding shoulders',
    'Dropping bar too quickly',
    'Not timing sets'
  ],
  variations: [
    'Double overhand barbell holds',
    'Mixed grip barbell holds'
  ]
},

{
  id: 'sledgehammer-levers',
  name: 'Sledgehammer Levers',
  category: 'arms',
  subCategory: 'forearms',
  difficulty: 'advanced',
  equipment: ['sledgehammer'],
  muscles: ['forearms', 'wrist stabilizers', 'grip'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761066884/Firefly_Performing_in_the_gym_209853_3_xzqgn9.jpg',
  instructions: [
    'Hold sledgehammer near bottom of handle',
    'Rotate wrist to move hammer head forward and back',
    'Control movement slowly'
  ],
  tips: [
    'Choke up for easier leverage',
    'Use slow controlled reps',
    'Add foam at the end of the hammer'
  ],
  commonMistakes: [
    'Holding too far down handle too soon',
    'Dropping hammer head quickly',
    'Using arm instead of wrist'
  ],
  variations: [
    'Side-to-side sledgehammer levers',
    'Two-hand sledgehammer rotations'
  ]
},
{
  id: 'back-squat',
  name: 'Back Squat',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'intermediate',
  equipment: ['barbell', 'rack'],
  muscles: ['quadriceps', 'glutes', 'hamstrings'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761066742/Firefly_Performing_in_the_gym_209853_2_fqfejx.jpg',
  instructions: [
    'Set barbell on upper traps and unrack',
    'Step back with feet shoulder-width apart',
    'Brace core and squat down until thighs are parallel',
    'Push through heels to return to standing'
  ],
  tips: [
    'Keep chest up',
    'Drive knees out',
    'Do not let heels lift'
  ],
  commonMistakes: [
    'Rounding lower back',
    'Letting knees cave in',
    'Leaning too far forward'
  ],
  variations: [
    'High-bar squat',
    'Low-bar squat'
  ]
},  

{
  id: 'front-squat',
  name: 'Front Squat',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'intermediate',
  equipment: ['barbell', 'rack'],
  muscles: ['quadriceps', 'core', 'glutes'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761066641/Firefly_Performing_in_the_gym_188140_2_tplbbo.jpg',
  instructions: [
    'Rack barbell across front shoulders with elbows high',
    'Step back with feet shoulder-width apart',
    'Squat down until thighs are parallel',
    'Drive upward keeping torso upright'
  ],
  tips: [
    'Keep elbows high throughout',
    'Brace core',
    'Focus on depth without losing posture'
  ],
  commonMistakes: [
    'Letting elbows drop',
    'Leaning forward',
    'Not bracing core'
  ],
  variations: [
    'Cross-arm front squat',
    'Dumbbell front squat'
  ]
},  

{
  id: 'goblet-squat',
  name: 'Goblet Squat',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'beginner',
  equipment: ['dumbbell' , 'kettlebell'],
  muscles: ['quadriceps', 'glutes'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761066553/Firefly_Performing_in_the_gym_188140_1_ebuvvb.jpg',
  instructions: [
    'Hold dumbbell or kettlebell at chest height',
    'Stand with feet shoulder-width apart',
    'Squat down keeping chest tall',
    'Return to standing position'
  ],
  tips: [
    'Keep weight close to chest',
    'Push knees out',
    'Maintain upright posture'
  ],
  commonMistakes: [
    'Holding weight away from chest',
    'Letting knees cave in',
    'Rising onto toes'
  ],
  variations: [
    'Double kettlebell squat',
    'Heels-elevated goblet squat'
  ]
},  

{
  id: 'split-squat',
  name: 'Split Squat',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'beginner',
  equipment: ['none'],
  muscles: ['quadriceps', 'glutes'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761066480/Firefly_Performing_in_the_gym_188140_n6affv.jpg',
  instructions: [
    'Stand with one leg forward and one leg back',
    'Lower body until back knee nearly touches floor',
    'Press through front heel to stand back up'
  ],
  tips: [
    'Keep torso upright',
    'Front knee should track over toes',
    'Brace core for stability'
  ],
  commonMistakes: [
    'Letting knee cave inward',
    'Leaning torso forward',
    'Pushing off back leg'
  ],
  variations: [
    'Weighted split squat',
    'Front-foot elevated split squat'
  ]
},  

{
  id: 'bulgarian-split-squat',
  name: 'Bulgarian Split Squat',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'intermediate',
  equipment: ['bench', 'dumbbells'],
  muscles: ['quadriceps', 'glutes', 'hamstrings'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761066381/Firefly_Performing_in_the_gym_209853_1_hlpodk.jpg',
  instructions: [
    'Stand in front of a bench with one foot resting on it behind you',
    'Lower down into a lunge until front thigh is parallel to floor',
    'Press through front heel to return to standing'
  ],
  tips: [
    'Keep torso upright',
    'Brace core',
    'Use a controlled range of motion'
  ],
  commonMistakes: [
    'Letting front knee travel too far forward',
    'Leaning excessively',
    'Rushing the movement'
  ],
  variations: [
    'Barbell Bulgarian split squat',
    'Smith machine Bulgarian split squat'
  ]
},  

{
  id: 'walking-lunge',
  name: 'Walking Lunge',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'intermediate',
  equipment: ['none'],
  muscles: ['quadriceps', 'glutes', 'hamstrings'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761066297/Firefly_Performing_in_the_gym_209853_ueiypo.jpg',
  instructions: [
    'Step forward into a lunge with one leg',
    'Lower until back knee nearly touches ground',
    'Push through front leg to step forward into next lunge'
  ],
  tips: [
    'Maintain upright torso',
    'Keep core braced',
    'Step far enough forward for balance'
  ],
  commonMistakes: [
    'Short steps causing knee strain',
    'Letting torso lean forward',
    'Not controlling descent'
  ],
  variations: [
    'Dumbbell walking lunges',
    'Barbell walking lunges'
  ]
},  

{
  id: 'harvard step ups',
  name: 'Harvard-Step-Up',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'beginner',
  equipment: ['bench', 'box'],
  muscles: ['quadriceps', 'glutes'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1761066175/Firefly_Performing_in_the_gym_on_a_box_188140_pxgvjd.jpg',
  instructions: [
    'Stand in front of a bench or box',
    'Step up with one leg, pressing through heel',
    'Bring other foot up to stand tall',
    'Step down and repeat on opposite leg'
  ],
  tips: [
    'Keep torso upright',
    'Drive through working leg',
    'Choose stable surface'
  ],
  commonMistakes: [
    'Pushing off back leg',
    'Letting knee cave inward',
    'Using box that is too high'
  ],
  variations: [
    'Weighted step-ups',
    'Lateral step-ups'
  ]
},  

{
  id: 'leg-press',
  name: 'Leg Press',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'intermediate',
  equipment: ['leg press machine'],
  muscles: ['quadriceps', 'glutes', 'hamstrings'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760995396/Firefly_someone_performing_in_the_gym_916776_8_m5x7dj.jpg',
  instructions: [
    'Sit on leg press machine with feet shoulder-width on platform',
    'Unlock safety handles and lower platform slowly',
    'Press platform back up without locking knees'
  ],
  tips: [
    'Keep lower back pressed into seat',
    'Control the descent',
    'Do not lock knees at top'
  ],
  commonMistakes: [
    'Letting heels lift',
    'Bouncing weight',
    'Using too much weight'
  ],
  variations: [
    'Single-leg press',
    'High/low foot placement leg press'
  ]
},  

{
  id: 'hack-squat',
  name: 'Hack Squat',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'intermediate',
  equipment: ['hack squat machine'],
  muscles: ['quadriceps', 'glutes'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760995314/Firefly_someone_performing_in_the_gym_916776_7_eygjxh.jpg',
  instructions: [
    'Position shoulders under pads and feet shoulder-width apart',
    'Unlock machine and squat down until thighs are parallel',
    'Push through heels to return to standing'
  ],
  tips: [
    'Keep back flat against pad',
    'Do not let knees collapse',
    'Control movement'
  ],
  commonMistakes: [
    'Lifting heels',
    'Shallow range of motion',
    'Overloading weight'
  ],
  variations: [
    'Reverse hack squat',
    'Single-leg hack squat'
  ]
},  

{
  id: 'sissy-squat',
  name: 'Sissy Squat',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'advanced',
  equipment: ['sissy squat bench' , 'none'],
  muscles: ['quadriceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760995223/Firefly_someone_performing_in_the_gym_58432_2_k445hj.jpg',
  instructions: [
    'Stand with feet shoulder-width and hold stable surface if needed',
    'Lean back while bending knees forward',
    'Lower until thighs are near floor level',
    'Return to standing position'
  ],
  tips: [
    'Keep core tight',
    'Control descent',
    'Focus on knee bend'
  ],
  commonMistakes: [
    'Falling backward',
    'Rushing movement',
    'Using momentum'
  ],
  variations: [
    'Weighted sissy squats',
    'Assisted sissy squats'
  ]
},  

{
  id: 'wall-sit',
  name: 'Wall Sit',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'beginner',
  equipment: ['none'],
  muscles: ['quadriceps', 'glutes'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760995123/Firefly_someone_performing_in_the_gym_916776_5_nqcn9l.jpg',
  instructions: [
    'Stand with back against wall and feet forward',
    'Slide down until thighs are parallel to floor',
    'Hold position for desired time'
  ],
  tips: [
    'Keep knees over ankles',
    'Do not push hands on thighs',
    'Breathe steadily'
  ],
  commonMistakes: [
    'Sliding too low',
    'Placing feet too close to wall',
    'Arching lower back'
  ],
  variations: [
    'Weighted wall sit',
    'Single-leg wall sit'
  ]
},  

{
  id: 'cyclist-squat',
  name: 'Cyclist Squat',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'intermediate',
  equipment: ['barbell' , 'plates'],
  muscles: ['quadriceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760994934/Firefly_someone_performing_in_the_gym_989281_1_pxkrdt.jpg',
  instructions: [
    'Stand with heels elevated on plates',
    'Hold barbell on back and squat down',
    'Descend until thighs are below parallel',
    'Return to standing'
  ],
  tips: [
    'Keep chest tall',
    'Stay balanced on heels',
    'Brace core'
  ],
  commonMistakes: [
    'Falling forward',
    'Knees collapsing inward',
    'Not controlling depth'
  ],
  variations: [
    'Dumbbell cyclist squat',
    'Smith machine cyclist squat'
  ]
},  

{
  id: 'box-step-down',
  name: 'Box Step-Down',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'intermediate',
  equipment: ['box' , 'bench'],
  muscles: ['quadriceps', 'glutes'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760994841/Firefly_someone_performing_in_the_gym_46950_fiykuf.jpg',
  instructions: [
    'Stand on box with one foot close to edge',
    'Slowly lower opposite foot to floor by bending working leg',
    'Press through standing leg to return to start'
  ],
  tips: [
    'Lower under control',
    'Keep torso upright',
    'Engage core'
  ],
  commonMistakes: [
    'Dropping quickly',
    'Leaning torso forward',
    'Letting knee cave in'
  ],
  variations: [
    'Weighted box step-downs',
    'Lateral step-downs'
  ]
},  

{
  id: 'pistol-squat',
  name: 'Pistol Squat',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'advanced',
  equipment: ['none'],
  muscles: ['quadriceps', 'glutes', 'hamstrings', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760994724/Firefly_someone_performing_in_the_gym_58432_1_rqczkf.jpg',
  instructions: [
    'Stand on one leg with opposite leg extended forward',
    'Lower down into deep single-leg squat',
    'Keep arms forward for balance',
    'Press back to standing on one leg'
  ],
  tips: [
    'Go slow and controlled',
    'Keep chest up',
    'Brace core tightly'
  ],
  commonMistakes: [
    'Falling backward',
    'Letting knee collapse inward',
    'Not maintaining balance'
  ],
  variations: [
    'Assisted pistol squats',
    'Weighted pistol squats'
  ]
},  

{
  id: 'heel-elevated-squat',
  name: 'Heel-Elevated Squat',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'beginner',
  equipment: ['plates' , 'barbell'],
  muscles: ['quadriceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760994508/Firefly_someone_performing_in_the_gym_916776_4_lw2rej.jpg',
  instructions: [
    'Place heels on plates to elevate',
    'Stand with feet shoulder-width apart',
    'Perform squat keeping torso upright',
    'Return to standing position'
  ],
  tips: [
    'Keep heels elevated throughout',
    'Brace core',
    'Focus on quad engagement'
  ],
  commonMistakes: [
    'Lifting heels off plates',
    'Leaning torso forward',
    'Shallow range of motion'
  ],
  variations: [
    'Dumbbell heel-elevated squat',
    'Goblet heel-elevated squat'
  ]
},  

{
  id: 'jefferson-squat',
  name: 'Jefferson Squat',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'advanced',
  equipment: ['barbell'],
  muscles: ['quadriceps', 'glutes', 'adductors'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760993629/Firefly_someone_performing_in_the_gym_916776_3_zmgojj.jpg',
  instructions: [
    'Stand straddling a barbell on the floor',
    'Grip bar with one hand in front, one behind',
    'Lift bar by squatting straight up',
    'Lower back to floor with control'
  ],
  tips: [
    'Keep torso upright',
    'Brace core',
    'Use controlled movement'
  ],
  commonMistakes: [
    'Rounding back',
    'Twisting excessively',
    'Rushing lift'
  ],
  variations: [
    'Dumbbell Jefferson squat',
    'Smith machine Jefferson squat'
  ]
},  

{
  id: 'zercher-squat',
  name: 'Zercher Squat',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'advanced',
  equipment: ['barbell'],
  muscles: ['quadriceps', 'glutes', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760993491/Firefly_someone_performing_in_the_gym_916776_2_dzbtkb.jpg',
  instructions: [
    'Hold barbell in crook of elbows at chest height',
    'Squat down keeping torso upright',
    'Push through heels to return to standing'
  ],
  tips: [
    'Brace core tightly',
    'Keep elbows up',
    'Control depth'
  ],
  commonMistakes: [
    'Rounding back',
    'Dropping elbows',
    'Using too heavy weight'
  ],
  variations: [
    'Front Zercher squat',
    'Walking Zercher squat'
  ]
},  

{
  id: 'smith-machine-squat',
  name: 'Smith Machine Squat',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'intermediate',
  equipment: ['smith machine'],
  muscles: ['quadriceps', 'glutes'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760993419/Firefly_someone_performing_in_the_gym_916776_1_lt6zn5.jpg',
  instructions: [
    'Position bar on upper traps in Smith machine',
    'Unrack and stand with feet shoulder-width apart',
    'Lower into squat until thighs are parallel',
    'Press back up to standing'
  ],
  tips: [
    'Keep back straight',
    'Adjust foot placement for comfort',
    'Maintain controlled movement'
  ],
  commonMistakes: [
    'Leaning too far forward',
    'Letting knees cave',
    'Not using full range of motion'
  ],
  variations: [
    'Front Smith machine squat',
    'Narrow-stance Smith machine squat'
  ]
},  

{
  id: 'leg-extension',
  name: 'Leg Extension',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'beginner',
  equipment: ['leg extension machine'],
  muscles: ['quadriceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760993334/Firefly_someone_performing_in_the_gym_989281_j0lqjg.jpg',
  instructions: [
    'Sit on leg extension machine with pads on shins',
    'Extend legs upward until straight',
    'Lower slowly back to start position'
  ],
  tips: [
    'Do not lock out knees',
    'Control tempo',
    'Adjust machine for proper alignment'
  ],
  commonMistakes: [
    'Swinging weight up',
    'Locking knees at top',
    'Using too much weight'
  ],
  variations: [
    'Single-leg leg extension',
    'Tempo-controlled leg extension'
  ]
},  

{
  id: 'spanish-squat',
  name: 'Spanish Squat',
  category: 'legs',
  subCategory: 'quadriceps',
  difficulty: 'intermediate',
  equipment: ['resistance band'],
  muscles: ['quadriceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760992937/Firefly_someone_performing_in_the_gym_916776_mmlxwn.jpg',
  instructions: [
    'Anchor band behind knees and step backward',
    'Squat down keeping torso upright',
    'Return to standing while maintaining band tension'
  ],
  tips: [
    'Keep chest tall',
    'Brace core',
    'Do not lean forward'
  ],
  commonMistakes: [
    'Letting knees collapse inward',
    'Leaning torso',
    'Not keeping band tension'
  ],
  variations: [
    'Weighted Spanish squat',
    'Single-leg Spanish squat'
  ]
},
{
  id: 'stiff-leg-deadlift',
  name: 'Stiff-Leg Deadlift',
  category: 'legs',
  subCategory: 'hamstrings',
  difficulty: 'intermediate',
  equipment: ['barbell'],
  muscles: ['hamstrings', 'glutes', 'lower back'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760992620/Firefly_someone_performing_in_the_gym_184412_1_ufe98c.jpg',
  instructions: [
    'Hold barbell with overhand grip',
    'Keep legs mostly straight, hinge at hips lowering bar',
    'Feel stretch in hamstrings',
    'Lift bar back to standing position'
  ],
  tips: [
    'Keep slight knee bend',
    'Maintain flat back',
    'Control the descent'
  ],
  commonMistakes: [
    'Locking knees',
    'Rounding back',
    'Bouncing bar off floor'
  ],
  variations: [
    'Dumbbell stiff-leg deadlift',
    'Smith machine stiff-leg deadlift'
  ]
},  

{
  id: 'good-morning',
  name: 'Good Morning',
  category: 'legs',
  subCategory: 'hamstrings',
  difficulty: 'intermediate',
  equipment: ['barbell'],
  muscles: ['hamstrings', 'glutes', 'lower back'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760992479/Firefly_someone_performing_in_the_gym_184412_ipnu2a.jpg',
  instructions: [
    'Place barbell on upper traps',
    'Slightly bend knees and hinge at hips forward',
    'Lower torso until back is parallel to floor',
    'Return to standing'
  ],
  tips: [
    'Keep back straight',
    'Move slowly',
    'Engage glutes and hamstrings'
  ],
  commonMistakes: [
    'Rounding lower back',
    'Bending knees too much',
    'Using excessive weight'
  ],
  variations: [
    'Dumbbell good morning',
    'Seated good morning'
  ]
},  

{
  id: 'glute-ham-raise',
  name: 'Glute-Ham Raise',
  category: 'legs',
  subCategory: 'hamstrings',
  difficulty: 'advanced',
  equipment: ['glute-ham developer'],
  muscles: ['hamstrings', 'glutes', 'calves'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760991562/Firefly_someone_performing_in_the_gym_572662_hqf43n.jpg',
  instructions: [
    'Secure feet on GHD machine',
    'Lower torso slowly forward',
    'Engage hamstrings to pull body back to start'
  ],
  tips: [
    'Move slowly for maximum tension',
    'Keep core engaged',
    'Do not arch lower back'
  ],
  commonMistakes: [
    'Using momentum',
    'Rounding back',
    'Incomplete range of motion'
  ],
  variations: [
    'Weighted glute-ham raise',
    'Band-assisted glute-ham raise'
  ]
},  

{
  id: 'lying-leg-curl',
  name: 'Lying Leg Curl',
  category: 'legs',
  subCategory: 'hamstrings',
  difficulty: 'beginner',
  equipment: ['leg curl machine'],
  muscles: ['hamstrings'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760646703/Firefly_Someone_performing_Lying_Leg_Curl_in_the_gym_587354_kbcrp6.jpg',
  instructions: [
    'Lie face down on machine with pads on ankles',
    'Curl legs toward glutes',
    'Lower slowly back to start'
  ],
  tips: [
    'Do not lift hips',
    'Control the movement',
    'Adjust machine for proper alignment'
  ],
  commonMistakes: [
    'Using momentum',
    'Arching hips',
    'Locking knees at top'
  ],
  variations: [
    'Single-leg lying leg curl',
    'Seated leg curl'
  ]
},  

{
  id: 'seated-leg-curl',
  name: 'Seated Leg Curl',
  category: 'legs',
  subCategory: 'hamstrings',
  difficulty: 'beginner',
  equipment: ['seated leg curl machine'],
  muscles: ['hamstrings'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760646567/Firefly_Someone_performing_Seated_Leg_Curl_in_the_gym_718_vrbtue.jpg',
  instructions: [
    'Sit on machine with pads on lower legs',
    'Curl legs downward toward seat',
    'Return slowly to start'
  ],
  tips: [
    'Do not lift thighs off pad',
    'Control movement',
    'Adjust machine for comfort'
  ],
  commonMistakes: [
    'Bouncing weight',
    'Using torso momentum',
    'Incomplete range of motion'
  ],
  variations: [
    'Single-leg seated leg curl',
    'Tempo-controlled leg curl'
  ]
},  

{
  id: 'nordic-hamstring-curl',
  name: 'Nordic Hamstring Curl',
  category: 'legs',
  subCategory: 'hamstrings',
  difficulty: 'advanced',
  equipment: ['kneeling pad', 'partner or anchor'],
  muscles: ['hamstrings', 'glutes'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760646489/Firefly_Someone_performing_Nordic_Hamstring_Curl_in_the_gym_587354_vkih0x.jpg',
  instructions: [
    'Kneel and secure feet under anchor',
    'Slowly lean forward keeping hips extended',
    'Use hamstrings to pull back to start'
  ],
  tips: [
    'Go slow and controlled',
    'Keep core tight',
    'Do not bend hips'
  ],
  commonMistakes: [
    'Using arms to push off',
    'Arching back',
    'Rushing the movement'
  ],
  variations: [
    'Assisted Nordic hamstring curl',
    'Weighted Nordic hamstring curl'
  ]
},  
{
  id: 'cable-pull-through',
  name: 'Cable Pull-Through',
  category: 'legs',
  subCategory: 'hamstrings',
  difficulty: 'beginner',
  equipment: ['cable machine', 'rope attachment'],
  muscles: ['hamstrings', 'glutes', 'lower back'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760646415/Firefly_Someone_performing_Cable_Pull-Through_in_the_gym_718_z94myp.jpg',
  instructions: [
    'Stand facing away from low cable with rope between legs',
    'Hinge at hips and pull rope through legs by contracting glutes and hamstrings',
    'Return to start position'
  ],
  tips: [
    'Keep back straight',
    'Hinge at hips, not knees',
    'Squeeze glutes at top'
  ],
  commonMistakes: [
    'Using back instead of glutes',
    'Bending knees too much',
    'Rushing the movement'
  ],
  variations: [
    'Dumbbell pull-through',
    'Band pull-through'
  ]
},  
{
  id: 'step-up-with-hamstring-focus',
  name: 'Step-Up with Hamstring Focus',
  category: 'legs',
  subCategory: 'hamstrings',
  difficulty: 'intermediate',
  equipment: ['bench', 'dumbbell'],
  muscles: ['hamstrings', 'glutes', 'quadriceps'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760646209/Firefly_Someone_performing_Step-Up_with_Hamstring_Focus_in_the_gym_677524_kuatn4.jpg',
  instructions: [
    'Step onto bench emphasizing hip extension with hamstrings',
    'Lower back down slowly',
    'Alternate legs'
  ],
  tips: [
    'Focus on pulling with hamstrings and glutes',
    'Keep torso upright',
    'Control descent'
  ],
  commonMistakes: [
    'Pushing with front foot too much',
    'Leaning forward',
    'Rushing reps'
  ],
  variations: [
    'Weighted step-up',
    'Banded step-up'
  ]
},  

{
  id: 'stability-ball-leg-curl',
  name: 'Stability Ball Leg Curl',
  category: 'legs',
  subCategory: 'hamstrings',
  difficulty: 'intermediate',
  equipment: ['stability ball'],
  muscles: ['hamstrings', 'glutes', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760646334/Firefly_Someone_performing_Stability_Ball_Leg_Curl_in_the_gym_718_wixin5.jpg',
  instructions: [
    'Lie on back with heels on ball',
    'Lift hips and roll ball toward glutes using heels',
    'Roll back out and repeat'
  ],
  tips: [
    'Keep hips elevated',
    'Control the ball movement',
    'Engage core'
  ],
  commonMistakes: [
    'Dropping hips',
    'Letting ball roll too fast',
    'Using momentum'
  ],
  variations: [
    'Single-leg stability ball curl',
    'Bridge with hamstring curl'
  ]
},  

{
  id: 'trx-hamstring-curl',
  name: 'TRX Hamstring Curl',
  category: 'legs',
  subCategory: 'hamstrings',
  difficulty: 'intermediate',
  equipment: ['TRX'],
  muscles: ['hamstrings', 'glutes', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760644869/Firefly_Someone_performing_TRX_Hamstring_Curl_in_the_gym_718_riuzuh.jpg',
  instructions: [
    'Lie on back with heels in TRX straps',
    'Lift hips and pull heels toward glutes',
    'Extend legs back out'
  ],
  tips: [
    'Keep hips elevated',
    'Control movement',
    'Engage core'
  ],
  commonMistakes: [
    'Dropping hips',
    'Rushing reps',
    'Not maintaining core tension'
  ],
  variations: [
    'Single-leg TRX curl',
    'Elevated TRX curl'
  ]
},  

{
  id: 'deadlift-from-deficit',
  name: 'Deadlift from Deficit',
  category: 'legs',
  subCategory: 'hamstrings',
  difficulty: 'advanced',
  equipment: ['barbell', 'plates'],
  muscles: ['hamstrings', 'glutes', 'lower back'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760644773/Firefly_Someone_performing_Deadlift_from_Deficit_in_the_gym_677524_aahdfb.jpg',
  instructions: [
    'Stand on plates or elevated surface',
    'Perform conventional deadlift from lower starting position',
    'Keep back flat and core tight'
  ],
  tips: [
    'Engage hamstrings and glutes',
    'Maintain neutral spine',
    'Lift controlled'
  ],
  commonMistakes: [
    'Rounding back',
    'Jerking weight',
    'Poor foot placement'
  ],
  variations: [
    'Sumo deadlift from deficit',
    'Trap bar deficit deadlift'
  ]
},  
{
  id: 'reverse-hyperextension',
  name: 'Reverse Hyperextension',
  category: 'legs',
  subCategory: 'hamstrings',
  difficulty: 'intermediate',
  equipment: ['reverse hyper machine'],
  muscles: ['hamstrings', 'glutes', 'lower back'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760644677/Firefly_Someone_performing_Reverse_Hyperextension_in_the_gym_677524_veewyx.jpg',
  instructions: [
    'Lie face down on reverse hyper machine',
    'Lift legs upward by contracting glutes and hamstrings',
    'Lower back under control'
  ],
  tips: [
    'Do not swing legs',
    'Focus on hamstring contraction',
    'Keep torso stable'
  ],
  commonMistakes: [
    'Using momentum',
    'Arching back',
    'Not controlling movement'
  ],
  variations: [
    'Weighted reverse hyper',
    'Single-leg reverse hyper'
  ]
},

{
  id: 'barbell-hip-thrust',
  name: 'Barbell Hip Thrust',
  category: 'legs',
  subCategory: 'glutes',
  difficulty: 'intermediate',
  equipment: ['barbell', 'bench'],
  muscles: ['glutes', 'hamstrings', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760644551/Firefly_Someone_performing_Barbell_Hip_Thrust_in_the_gym_587354_1_z9mfte.jpg',
  instructions: [
    'Sit with upper back against bench and barbell on hips',
    'Drive hips upward until torso parallel to floor',
    'Lower under control'
  ],
  tips: [
    'Squeeze glutes at top',
    'Keep chin tucked',
    'Feet flat on floor'
  ],
  commonMistakes: [
    'Overarching lower back',
    'Placing feet incorrectly',
    'Using momentum'
  ],
  variations: [
    'Banded barbell hip thrust',
    'Single-leg barbell hip thrust'
  ]
},

{
  id: 'glute-bridge',
  name: 'Glute Bridge',
  category: 'legs',
  subCategory: 'glutes',
  difficulty: 'beginner',
  equipment: ['none'],
  muscles: ['glutes', 'hamstrings', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760644424/Firefly_Someone_performing_Glute_Bridge_in_the_gym_587354_m7656e.jpg',
  instructions: [
    'Lie on back with knees bent, feet flat on floor',
    'Drive hips up squeezing glutes',
    'Lower back down slowly'
  ],
  tips: [
    'Engage core',
    'Do not overarch back',
    'Pause at top for maximum contraction'
  ],
  commonMistakes: [
    'Hyperextending lower back',
    'Feet too far from glutes',
    'Rushing reps'
  ],
  variations: [
    'Single-leg glute bridge',
    'Banded glute bridge'
  ]
},

{
  id: 'single-leg-glute-bridge',
  name: 'Single-Leg Glute Bridge',
  category: 'legs',
  subCategory: 'glutes',
  difficulty: 'intermediate',
  equipment: ['none'],
  muscles: ['glutes', 'hamstrings', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760644329/Firefly_Someone_performing_Single-Leg_Glute_Bridge_in_the_gym_677524_f6sxnn.jpg',
  instructions: [
    'Lie on back with one knee bent and other leg extended',
    'Drive bent-leg foot into floor to lift hips',
    'Lower slowly and repeat'
  ],
  tips: [
    'Keep hips level',
    'Engage core',
    'Squeeze glutes at top'
  ],
  commonMistakes: [
    'Dropping extended leg',
    'Overarching lower back',
    'Rushing movement'
  ],
  variations: [
    'Elevated single-leg glute bridge',
    'Weighted single-leg glute bridge'
  ]
},
{
  id: 'sumo-deadlift',
  name: 'Sumo Deadlift',
  category: 'legs',
  subCategory: 'glutes',
  difficulty: 'intermediate',
  equipment: ['barbell'],
  muscles: ['glutes', 'hamstrings', 'lower back', 'quads'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760644158/Firefly_Someone_performing_Sumo_Deadlift_in_the_gym_321109_uzl4l5.jpg',
  instructions: [
    'Take wide stance with toes pointing outward',
    'Grip bar inside legs',
    'Lift bar keeping back flat and hips low',
    'Stand tall at top'
  ],
  tips: [
    'Engage glutes and hamstrings',
    'Keep bar close to shins',
    'Drive through heels'
  ],
  commonMistakes: [
    'Rounding back',
    'Hips too high',
    'Bar too far from body'
  ],
  variations: [
    'Deficit sumo deadlift',
    'Sumo deadlift with straps'
  ]
},

{
  id: 'romanian-deadlift',
  name: 'Romanian Deadlift',
  category: 'legs',
  subCategory: 'glutes',
  difficulty: 'intermediate',
  equipment: ['barbell'],
  muscles: ['hamstrings', 'glutes', 'lower back'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760644055/Firefly_Someone_performing_Romanian_Deadlift_in_the_gym_587354_eob4lb.jpg',
  instructions: [
    'Hold barbell in front with overhand grip',
    'Hinge at hips, keeping back flat, lower bar along legs',
    'Stop when hamstrings are stretched',
    'Return to standing by driving hips forward'
  ],
  tips: [
    'Keep knees slightly bent',
    'Do not round back',
    'Engage core throughout'
  ],
  commonMistakes: [
    'Bending knees too much',
    'Rounding lower back',
    'Using momentum'
  ],
  variations: [
    'Dumbbell Romanian deadlift',
    'Single-leg Romanian deadlift'
  ]
},

{
  id: 'kettlebell-swing',
  name: 'Kettlebell Swing',
  category: 'legs',
  subCategory: 'glutes',
  difficulty: 'beginner',
  equipment: ['kettlebell'],
  muscles: ['glutes', 'hamstrings', 'lower back', 'shoulders'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760643933/Firefly_Someone_performing_Kettlebell_Swing_in_the_gym_677524_a6ia4u.jpg',
  instructions: [
    'Hold kettlebell with both hands',
    'Hinge at hips and swing kettlebell between legs',
    'Drive hips forward to swing kettlebell up to chest height',
    'Repeat continuously'
  ],
  tips: [
    'Use hip drive, not arms',
    'Keep back straight',
    'Engage core'
  ],
  commonMistakes: [
    'Squatting instead of hinging',
    'Using arms to lift kettlebell',
    'Rounding back'
  ],
  variations: [
    'Single-arm kettlebell swing',
    'American swing (overhead)'
  ]
},

{
  id: 'cable-kickback',
  name: 'Cable Kickback',
  category: 'legs',
  subCategory: 'glutes',
  difficulty: 'beginner',
  equipment: ['cable machine', 'ankle strap'],
  muscles: ['glutes', 'hamstrings'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760643676/Firefly_Someone_performing_Cable_Donkey_Kick_in_the_gym_587354_nvecmu.jpg',
  instructions: [
    'Attach ankle strap to low cable',
    'Kick leg backward while keeping knee slightly bent',
    'Return slowly to start position'
  ],
  tips: [
    'Focus on glute contraction',
    'Control the movement',
    'Keep torso stable'
  ],
  commonMistakes: [
    'Using momentum',
    'Arching lower back',
    'Bending supporting knee too much'
  ],
  variations: [
    'Bodyweight glute kickback',
    'Banded glute kickback'
  ]
},

{
  id: 'donkey-kick',
  name: 'Donkey Kick',
  category: 'legs',
  subCategory: 'glutes',
  difficulty: 'beginner',
  equipment: ['none'],
  muscles: ['glutes', 'hamstrings', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760643530/Firefly_Someone_performing_Donkey_Kick_in_the_gym_718_blxffo.jpg',
  instructions: [
    'Start on hands and knees',
    'Kick one leg back and up while keeping knee bent',
    'Lower slowly and repeat'
  ],
  tips: [
    'Squeeze glutes at top',
    'Keep core engaged',
    'Avoid arching back'
  ],
  commonMistakes: [
    'Using momentum',
    'Arching lower back',
    'Not fully contracting glutes'
  ],
  variations: [
    'Banded donkey kick',
    'Weighted donkey kick'
  ]
},

{
  id: 'frog-pump',
  name: 'Frog Pump',
  category: 'legs',
  subCategory: 'glutes',
  difficulty: 'beginner',
  equipment: ['none'],
  muscles: ['glutes', 'hamstrings'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760643410/Firefly_Someone_performing_in_the_gym_587354_1_rqimeh.jpg',
  instructions: [
    'Lie on back with soles of feet together and knees outward',
    'Drive hips up squeezing glutes',
    'Lower slowly and repeat'
  ],
  tips: [
    'Keep feet together',
    'Focus on glute contraction',
    'Control movement'
  ],
  commonMistakes: [
    'Overarching back',
    'Rushing reps',
    'Feet too far apart'
  ],
  variations: [
    'Weighted frog pump',
    'Banded frog pump'
  ]
},

{
  id: 'clamshell',
  name: 'Clamshell',
  category: 'legs',
  subCategory: 'glutes',
  difficulty: 'beginner',
  equipment: ['resistance band optional'],
  muscles: ['gluteus medius', 'glutes', 'hip abductors'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760643296/Firefly_Someone_performing_Clamshell_in_the_gym_587354_mpchyk.jpg',
  instructions: [
    'Lie on side with knees bent',
    'Lift top knee while keeping feet together',
    'Lower slowly'
  ],
  tips: [
    'Engage glutes throughout',
    'Do not rotate hips backward',
    'Use resistance band for added tension'
  ],
  commonMistakes: [
    'Rolling hips backward',
    'Using momentum',
    'Incomplete range of motion'
  ],
  variations: [
    'Banded clamshell',
    'Standing clamshell'
  ]
},

{
  id: 'side-lying-leg-lift',
  name: 'Side-Lying Leg Lift',
  category: 'legs',
  subCategory: 'glutes',
  difficulty: 'beginner',
  equipment: ['none'],
  muscles: ['glutes', 'hip abductors', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760643215/Firefly_Someone_performing_Side-Lying_Leg_Lift_in_the_gym_718_cgekzg.jpg',
  instructions: [
    'Lie on side with legs straight',
    'Lift top leg upward slowly',
    'Lower with control'
  ],
  tips: [
    'Keep hips stacked',
    'Engage glutes',
    'Control movement'
  ],
  commonMistakes: [
    'Rotating hips backward',
    'Using momentum',
    'Not fully lifting leg'
  ],
  variations: [
    'Banded side-lying leg lift',
    'Standing side leg lift'
  ]
},

{
  id: 'fire-hydrant',
  name: 'Fire Hydrant',
  category: 'legs',
  subCategory: 'glutes',
  difficulty: 'beginner',
  equipment: ['none'],
  muscles: ['glutes', 'hip abductors', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760643115/Firefly_Someone_performing_in_the_gym_587354_o5wu5s.jpg',
  instructions: [
    'Start on hands and knees',
    'Lift one knee out to side while keeping knee bent',
    'Lower slowly and repeat'
  ],
  tips: [
    'Keep core tight',
    'Do not rotate torso',
    'Squeeze glutes at top'
  ],
  commonMistakes: [
    'Rotating torso',
    'Using momentum',
    'Not completing full range of motion'
  ],
  variations: [
    'Banded fire hydrant',
    'Weighted fire hydrant'
  ]
},

{
  id: 'lateral-band-walk',
  name: 'Lateral Band Walk',
  category: 'legs',
  subCategory: 'glutes',
  difficulty: 'beginner',
  equipment: ['resistance band'],
  muscles: ['glutes', 'hip abductors', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760642999/Firefly_Someone_performing_Lateral_Band_Walk_in_the_gym_718_e3mk5m.jpg',
  instructions: [
    'Place band around legs above knees or ankles',
    'Bend knees slightly and step sideways maintaining tension in band',
    'Alternate sides'
  ],
  tips: [
    'Keep feet apart to maintain band tension',
    'Engage glutes',
    'Move slowly and controlled'
  ],
  commonMistakes: [
    'Stepping too close and losing tension',
    'Leaning forward',
    'Using momentum instead of glutes'
  ],
  variations: [
    'Monster walks',
    'Banded side step with squat'
  ]
},

{
  id: 'curtsy-lunge',
  name: 'Curtsy Lunge',
  category: 'legs',
  subCategory: 'glutes',
  difficulty: 'intermediate',
  equipment: ['dumbbells optional'],
  muscles: ['glutes', 'quads', 'hamstrings', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760642873/Firefly_Someone_performing_Curtsy_Lunge_in_the_gym_677524_dbdo4k.jpg',
  instructions: [
    'Step one leg diagonally behind other leg into lunge',
    'Lower back knee toward floor',
    'Drive front heel to return to start'
  ],
  tips: [
    'Keep torso upright',
    'Engage glutes throughout',
    'Control movement'
  ],
  commonMistakes: [
    'Leaning forward',
    'Knee tracking inward',
    'Using momentum'
  ],
  variations: [
    'Weighted curtsy lunge',
    'Banded curtsy lunge'
  ]
},
{
  id: 'smith-machine-hip-thrust',
  name: 'Smith Machine Hip Thrust',
  category: 'legs',
  subCategory: 'glutes',
  difficulty: 'intermediate',
  equipment: ['smith machine', 'bench'],
  muscles: ['glutes', 'hamstrings', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760640406/Firefly_Someone_performing_Smith_Machine_Hip_Thrust_in_the_gym_587354_1_wltkco.jpg',
  instructions: [
    'Sit on floor with upper back against bench under Smith bar',
    'Place bar on hips and lift hips to parallel',
    'Lower slowly under control'
  ],
  tips: [
    'Squeeze glutes at top',
    'Feet flat on floor',
    'Control bar movement'
  ],
  commonMistakes: [
    'Hyperextending back',
    'Using momentum',
    'Feet too far or close to bench'
  ],
  variations: [
    'Single-leg Smith hip thrust',
    'Banded Smith hip thrust'
  ]
},

{
  id: 'single-leg-romanian-deadlift',
  name: 'Single-Leg Romanian Deadlift',
  category: 'legs',
  subCategory: 'glutes',
  difficulty: 'intermediate',
  equipment: ['dumbbell', 'kettlebell'],
  muscles: ['glutes', 'hamstrings', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760640320/Firefly_Someone_performing_Single-Leg_Romanian_Deadlift_in_the_gym_321109_dbyxwg.jpg',
  instructions: [
    'Hold weight in one hand or both',
    'Stand on one leg, hinge forward at hip',
    'Lower weight toward floor while keeping back straight',
    'Return to standing'
  ],
  tips: [
    'Keep balance with core engaged',
    'Maintain slight bend in standing knee',
    'Move slowly and controlled'
  ],
  commonMistakes: [
    'Bending standing leg too much',
    'Rounding back',
    'Losing balance'
  ],
  variations: [
    'No weight single-leg RDL',
    'Barbell single-leg RDL'
  ]
},
{
  id: 'standing-calf-raise',
  name: 'Standing Calf Raise',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'beginner',
  equipment: ['bodyweight', 'machine optional'],
  muscles: ['gastrocnemius', 'soleus'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760640246/Firefly_Someone_performing_Standing_Calf_Raise_in_the_gym_718_xffwlu.jpg',
  instructions: [
    'Stand on edge of a step or flat surface',
    'Raise heels as high as possible',
    'Lower heels below step level slowly'
  ],
  tips: [
    'Keep core engaged',
    'Control movement',
    'Pause at top for contraction'
  ],
  commonMistakes: [
    'Bouncing',
    'Leaning forward',
    'Not using full range of motion'
  ],
  variations: [
    'Weighted standing calf raise',
    'Single-leg standing calf raise'
  ]
},

{
  id: 'seated-calf-raise',
  name: 'Seated Calf Raise',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'beginner',
  equipment: ['seated calf raise machine', 'dumbbell optional'],
  muscles: ['soleus', 'gastrocnemius'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760640161/Firefly_Someone_performing_Seated_Calf_Raise_in_the_gym_677524_dqv1w2.jpg',
  instructions: [
    'Sit on machine or bench with weight on knees',
    'Raise heels as high as possible',
    'Lower heels slowly below starting position'
  ],
  tips: [
    'Control movement',
    'Do not bounce',
    'Squeeze calves at top'
  ],
  commonMistakes: [
    'Using momentum',
    'Partial range of motion',
    'Leaning forward'
  ],
  variations: [
    'Single-leg seated calf raise',
    'Resistance band seated calf raise'
  ]
},

{
  id: 'donkey-calf-raise',
  name: 'Donkey Calf Raise',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'intermediate',
  equipment: ['bodyweight', 'partner optional'],
  muscles: ['gastrocnemius', 'soleus'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760640071/Firefly_Someone_performing_Donkey_Calf_Raise_in_the_gym_718_onbb4w.jpg',
  instructions: [
    'Bend forward with hips at 90° and hands supported',
    'Raise heels as high as possible',
    'Lower heels slowly'
  ],
  tips: [
    'Keep core engaged',
    'Pause at top',
    'Focus on calves'
  ],
  commonMistakes: [
    'Bouncing',
    'Arching back',
    'Partial range of motion'
  ],
  variations: [
    'Weighted donkey calf raise',
    'Single-leg donkey calf raise'
  ]
},

{
  id: 'single-leg-standing-calf-raise',
  name: 'Single-Leg Standing Calf Raise',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'intermediate',
  equipment: ['bodyweight', 'dumbbell optional'],
  muscles: ['gastrocnemius', 'soleus'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760639988/Firefly_Someone_performing_Single-Leg_Standing_Calf_Raise_in_the_gym_677524_li37p4.jpg',
  instructions: [
    'Stand on one foot on a step or flat surface',
    'Raise heel as high as possible',
    'Lower slowly below step level'
  ],
  tips: [
    'Balance using support if needed',
    'Engage core',
    'Use full range of motion'
  ],
  commonMistakes: [
    'Bouncing',
    'Leaning',
    'Partial range of motion'
  ],
  variations: [
    'Weighted single-leg calf raise',
    'Banded single-leg calf raise'
  ]
},

{
  id: 'single-leg-seated-calf-raise',
  name: 'Single-Leg Seated Calf Raise',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'intermediate',
  equipment: ['bench', 'dumbbell optional'],
  muscles: ['soleus', 'gastrocnemius'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760639901/Firefly_Someone_performing_Single-Leg_Seated_Calf_Raise_in_the_gym_677524_xkjqb4.jpg',
  instructions: [
    'Sit on bench with one foot on floor and weight on knee',
    'Raise heel as high as possible',
    'Lower slowly'
  ],
  tips: [
    'Focus on calf contraction',
    'Control movement',
    'Keep knee stable'
  ],
  commonMistakes: [
    'Bouncing',
    'Partial range of motion',
    'Leaning forward'
  ],
  variations: [
    'Resistance band single-leg seated calf raise'
  ]
},

{
  id: 'calf-press-on-leg-press-machine',
  name: 'Calf Press on Leg Press Machine',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'beginner',
  equipment: ['leg press machine'],
  muscles: ['gastrocnemius', 'soleus'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760639824/Firefly_Someone_performing_Calf_Press_on_Leg_Press_Machine_in_the_gym_677524_hvyusq.jpg',
  instructions: [
    'Sit on leg press machine with feet on platform',
    'Press through toes to lift weight',
    'Lower heels slowly'
  ],
  tips: [
    'Use controlled motion',
    'Pause at top',
    'Do not lock knees'
  ],
  commonMistakes: [
    'Bouncing',
    'Locking knees',
    'Partial range of motion'
  ],
  variations: [
    'Single-leg calf press',
    'Toe-in or toe-out variations'
  ]
},

{
  id: 'jump-rope',
  name: 'Jump Rope',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'beginner',
  equipment: ['jump rope'],
  muscles: ['gastrocnemius', 'soleus', 'quads'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760639760/Firefly_Someone_performing_Jump_Rope_in_the_gym_677524_swtuti.jpg',
  instructions: [
    'Hold rope handles and jump on balls of feet',
    'Rotate rope under feet continuously',
    'Land softly on balls of feet'
  ],
  tips: [
    'Keep jumps small',
    'Engage core',
    'Stay on balls of feet'
  ],
  commonMistakes: [
    'Jumping too high',
    'Landing flat-footed',
    'Using arms too much'
  ],
  variations: [
    'Single-leg jump rope',
    'Double unders'
  ]
},

{
  id: 'box-jumps',
  name: 'Box Jumps',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'intermediate',
  equipment: ['plyo box'],
  muscles: ['gastrocnemius', 'quads', 'glutes', 'hamstrings'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760639677/Firefly_Someone_performing_Box_Jumps_in_the_gym_718_hissc1.jpg',
  instructions: [
    'Stand facing box',
    'Jump onto box landing softly on balls of feet',
    'Step or jump down carefully'
  ],
  tips: [
    'Explode through calves',
    'Engage core',
    'Land softly'
  ],
  commonMistakes: [
    'Landing flat-footed',
    'Not using arms for momentum',
    'Jumping too far forward'
  ],
  variations: [
    'Weighted box jumps',
    'Lateral box jumps'
  ]
},

{
  id: 'farmers-carry-on-toes',
  name: 'Farmer’s Carry on Toes',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'intermediate',
  equipment: ['dumbbells', 'kettlebells'],
  muscles: ['gastrocnemius', 'forearms', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760639601/Firefly_Someone_performing_Farmer_s_Carry_on_Toes_in_the_gym_321109_vkul4w.jpg',
  instructions: [
    'Hold weight in each hand',
    'Rise onto balls of feet and walk forward',
    'Maintain posture and core engagement'
  ],
  tips: [
    'Take controlled steps',
    'Keep core tight',
    'Focus on calf engagement'
  ],
  commonMistakes: [
    'Leaning forward',
    'Rushing steps',
    'Dropping heels to floor'
  ],
  variations: [
    'Single-leg carry',
    'Farmer’s carry with resistance band'
  ]
},

{
  id: 'heel-drop',
  name: 'Heel Drop',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'beginner',
  equipment: ['step or elevated surface'],
  muscles: ['gastrocnemius', 'soleus'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760639529/Firefly_Someone_performing_Heel_Drop_in_the_gym_321109_fyqaro.jpg',
  instructions: [
    'Stand on edge of step with heels hanging',
    'Lower heels below step slowly',
    'Raise back to starting position'
  ],
  tips: [
    'Control descent',
    'Pause at bottom',
    'Engage calves'
  ],
  commonMistakes: [
    'Bouncing',
    'Using momentum',
    'Partial range of motion'
  ],
  variations: [
    'Weighted heel drops',
    'Single-leg heel drops'
  ]
},

{
  id: 'weighted-step-up-on-toes',
  name: 'Weighted Step-Up on Toes',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'intermediate',
  equipment: ['bench', 'dumbbells'],
  muscles: ['gastrocnemius', 'soleus', 'glutes', 'quads'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760639416/Firefly_Someone_performing_Weighted_Step-Up_on_Toes_in_the_gym_718_wwzyky.jpg',
  instructions: [
    'Step onto platform holding weights',
    'Rise onto balls of feet at top',
    'Step down slowly'
  ],
  tips: [
    'Focus on calf contraction',
    'Control movement',
    'Engage glutes and core'
  ],
  commonMistakes: [
    'Landing flat-footed',
    'Using momentum',
    'Partial contraction'
  ],
  variations: [
    'Single-leg weighted step-up on toes'
  ]
},

{
  id: 'smith-machine-calf-raise',
  name: 'Smith Machine Calf Raise',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'intermediate',
  equipment: ['smith machine'],
  muscles: ['gastrocnemius', 'soleus'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760639269/Firefly_Someone_performing_Smith_Machine_Calf_Raise_in_the_gym_587354_r8gcnd.jpg',
  instructions: [
    'Stand with balls of feet on elevated surface under Smith bar',
    'Raise heels as high as possible',
    'Lower heels slowly'
  ],
  tips: [
    'Use full range of motion',
    'Pause at top',
    'Control descent'
  ],
  commonMistakes: [
    'Bouncing',
    'Partial range',
    'Not engaging calves fully'
  ],
  variations: [
    'Single-leg Smith machine calf raise'
  ]
},

{
  id: 'calf-raise-on-leg-extension-machine',
  name: 'Calf Raise on Leg Extension Machine',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'beginner',
  equipment: ['leg extension machine'],
  muscles: ['gastrocnemius', 'soleus'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760639155/Firefly_Someone_performing_Calf_Raise_on_Leg_Extension_Machine_in_the_gym_587354_piaux1.jpg',
  instructions: [
    'Sit on leg extension machine and place toes on footpad',
    'Raise heels as high as possible',
    'Lower slowly to starting position'
  ],
  tips: [
    'Control movement',
    'Pause at top',
    'Focus on calves'
  ],
  commonMistakes: [
    'Bouncing',
    'Partial range of motion',
    'Leaning forward'
  ],
  variations: [
    'Single-leg calf raise on leg extension machine'
  ]
},

{
  id: 'resistance-band-calf-press',
  name: 'Resistance Band Calf Press',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'beginner',
  equipment: ['resistance band'],
  muscles: ['gastrocnemius', 'soleus'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760638801/Firefly_Someone_performing_Resistance_Band_Calf_Press_in_the_gym_718_al7iwq.jpg',
  instructions: [
    'Anchor band and place ball of foot against band',
    'Press through toes to extend ankle',
    'Return slowly to start'
  ],
  tips: [
    'Control movement',
    'Engage calves fully',
    'Keep foot aligned'
  ],
  commonMistakes: [
    'Snapping band',
    'Partial movement',
    'Leaning'
  ],
  variations: [
    'Single-leg resistance band calf press'
  ]
},

{
  id: 'explosive-jump-squats',
  name: 'Explosive Jump Squats',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['gastrocnemius', 'quads', 'glutes', 'hamstrings'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760638717/Firefly_Someone_performing_Explosive_Jump_Squats_in_the_gym_677524_acj1jx.jpg',
  instructions: [
    'Perform a squat and explode upward into jump',
    'Land softly on balls of feet',
    'Repeat continuously'
  ],
  tips: [
    'Engage calves and quads',
    'Land softly',
    'Use arms for momentum'
  ],
  commonMistakes: [
    'Landing flat-footed',
    'Bending knees incorrectly',
    'Using too little range of motion'
  ],
  variations: [
    'Weighted jump squat',
    'Box jump'
  ]
},

{
  id: 'plyometric-lunges',
  name: 'Plyometric Lunges',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['gastrocnemius', 'quads', 'glutes', 'hamstrings'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760638632/Firefly_Someone_performing_Plyometric_Lunges_in_the_gym_677524_xxgera.jpg',
  instructions: [
    'Start in lunge position',
    'Explosively jump switching legs mid-air',
    'Land softly in lunge'
  ],
  tips: [
    'Engage calves for push-off',
    'Control landing',
    'Keep core tight'
  ],
  commonMistakes: [
    'Landing flat-footed',
    'Knee caving inward',
    'Using arms incorrectly'
  ],
  variations: [
    'Weighted plyometric lunges',
    'Alternating step-back lunge jumps'
  ]
},

{
  id: 'tippy-toe-walk',
  name: 'Tippy-Toe Walk',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'beginner',
  equipment: ['none'],
  muscles: ['gastrocnemius', 'soleus'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760638491/Firefly_Someone_performing_Tippy_Toe_Walk_in_the_gym_677524_mbt27t.jpg',
  instructions: [
    'Walk forward on balls of feet',
    'Maintain upright posture',
    'Continue for distance or time'
  ],
  tips: [
    'Engage calves throughout',
    'Keep core tight',
    'Take controlled steps'
  ],
  commonMistakes: [
    'Walking flat-footed',
    'Leaning forward',
    'Rushing steps'
  ],
  variations: [
    'Weighted tippy-toe walk',
    'Tippy-toe walk with resistance band'
  ]
},

{
  id: 'stair-climb-on-toes',
  name: 'Stair Climb on Toes',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'beginner',
  equipment: ['stairs'],
  muscles: ['gastrocnemius', 'soleus', 'quads'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760473716/Firefly_Someone_in_the_gym_performing_Stair_Climb_on_Toes_in_the_gym._71363_xpwspf.jpg',
  instructions: [
    'Climb stairs using balls of feet',
    'Step up and down focusing on calf contraction',
    'Continue for desired repetitions or time'
  ],
  tips: [
    'Engage calves throughout',
    'Control each step',
    'Maintain upright posture'
  ],
  commonMistakes: [
    'Stepping flat-footed',
    'Rushing steps',
    'Leaning forward'
  ],
  variations: [
    'Weighted stair climb on toes',
    'Double step stair climb'
  ]
},

{
  id: 'sled-push-on-toes',
  name: 'Sled Push on Toes',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'intermediate',
  equipment: ['sled', 'weights optional'],
  muscles: ['gastrocnemius', 'quads', 'glutes', 'hamstrings'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760473632/Firefly_Someone_in_the_gym_performing_Sled_Push_on_Toes_in_the_gym._678553_r7hdxz.jpg',
  instructions: [
    'Load sled with weight',
    'Push using balls of feet',
    'Keep body tight and drive forward'
  ],
  tips: [
    'Engage calves and core',
    'Keep back straight',
    'Drive through heels and toes'
  ],
  commonMistakes: [
    'Leaning too far forward',
    'Dropping heels',
    'Using momentum instead of strength'
  ],
  variations: [
    'Single-leg sled push on toes',
    'Resistance band sled push'
  ]
},

{
  id: 'ankle-circles-with-weight',
  name: 'Ankle Circles with Weight',
  category: 'legs',
  subCategory: 'calves',
  difficulty: 'beginner',
  equipment: ['light dumbbell or ankle weight'],
  muscles: ['gastrocnemius', 'soleus', 'ankle stabilizers'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760473557/Firefly_Someone_in_the_gym_performing_Ankle_Circles_with_weight_in_the_gym._71363_xdjtuv.jpg',
  instructions: [
    'Sit or lie down with leg extended',
    'Hold weight on foot or ankle',
    'Perform slow ankle circles in both directions'
  ],
  tips: [
    'Control movement',
    'Keep ankle flexible',
    'Engage calves gently'
  ],
  commonMistakes: [
    'Moving too fast',
    'Using momentum',
    'Not keeping leg steady'
  ],
  variations: [
    'Resistance band ankle circles',
    'Single-leg ankle circles without weight'
  ]
},
{
  id: 'leg-raise',
  name: 'Leg Raise',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'beginner',
  equipment: ['bodyweight'],
  muscles: ['abs', 'hip flexors'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760467543/Firefly_Someone_performing_Leg_Raise_in_the_gym_584918_j0yksy.jpg',
  instructions: [
    'Lie flat on your back with legs extended.',
    'Place hands under glutes for support.',
    'Lift legs toward ceiling while keeping them straight.',
    'Lower slowly without touching the floor.'
  ],
tips: [
  'Keep your lower back pressed into the floor',
  'Engage your core throughout the movement',
  'Lower your legs slowly and controlled'
],
commonMistakes: [
  'Arching the lower back',
  'Using momentum to lift legs',
  'Letting feet touch the ground between reps'
],
variations: [
  'Weighted Leg Raise',
  'Incline Leg Raise'
]
},  

{
  id: 'hanging-leg-raise',
  name: 'Hanging Leg Raise',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'advanced',
  equipment: ['pull-up bar'],
  muscles: ['abs', 'hip flexors'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760467384/Firefly_Someone_performing_Hanging_Leg_Raise_in_the_gym_584918_skcerc.jpg',
  instructions: [
    'Hang from a pull-up bar with arms extended.',
    'Engage core and lift legs until parallel to floor or higher.',
    'Lower slowly to starting position.'
  ],
tips: [
  'Engage your core before lifting your legs',
  'Keep the movement slow and controlled',
  'Avoid swinging by stabilizing your upper body'
],
commonMistakes: [
  'Using momentum to lift legs',
  'Arching the lower back',
  'Not controlling the descent'
],
variations: [
  'Knee Raise',
  'Weighted Hanging Leg Raise'
]
},  

{
  id: 'reverse-crunch',
  name: 'Reverse Crunch',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'beginner',
  equipment: ['bodyweight'],
  muscles: ['abs'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760467189/Firefly_Someone_performing_Reverse_Crunch_in_the_gym_298150_mpzw6l.jpg',
  instructions: [
    'Lie on back with legs bent and feet off the floor.',
    'Place hands at sides for stability.',
    'Curl hips off floor by bringing knees toward chest.',
    'Lower slowly and repeat.'
  ],
tips: [
  'Lift your hips using your core, not momentum',
  'Keep your movements slow and controlled',
  'Press your lower back into the floor'
],
commonMistakes: [
  'Swinging the legs',
  'Arching the lower back',
  'Not lifting hips high enough'
],
variations: [
  'Weighted Reverse Crunch',
  'Incline Reverse Crunch'
]
},  

{
  id: 'flutter-kick',
  name: 'Flutter Kick',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['abs', 'hip flexors'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760467087/Firefly_Someone_performing_Flutter_Kicks_in_the_gym_713519_yla6ia.jpg',
  instructions: [
    'Lie flat on your back with legs extended.',
    'Lift legs slightly off the floor.',
    'Alternate small, fast kicks up and down.',
    'Keep lower back pressed into ground.'
  ],
tips: [
  'Keep your lower back flat on the floor',
  'Engage your core the entire time',
  'Kick with small, controlled movements'
],
commonMistakes: [
  'Arching the lower back',
  'Kicking too high or too fast',
  'Letting feet touch the ground'
],
variations: [
  'Weighted Flutter Kicks',
  'Hands-Under-Hips Flutter Kicks'
]
},  

{
  id: 'scissor-kick',
  name: 'Scissor Kick',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['abs', 'hip flexors'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760466977/Firefly_Someone_performing_Scissor_Kicks_in_the_gym_584918_yekf6x.jpg',
  instructions: [
    'Lie flat on your back with legs extended.',
    'Lift both legs off the ground slightly.',
    'Cross legs over each other in a scissor motion.',
    'Keep core engaged and movement controlled.'
  ],
tips: [
  'Keep your lower back pressed to the floor',
  'Engage your core throughout',
  'Move your legs in a slow, controlled motion'
],
commonMistakes: [
  'Arching the lower back',
  'Moving too fast',
  'Letting legs drop too low'
],
variations: [
  'Flutter Kick',
  'Weighted Scissor Kick'
]
},  

{
  id: 'mountain-climber',
  name: 'Mountain Climber',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['abs', 'hip flexors', 'shoulders'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760466759/Firefly_Someone_performing_Mountain_Climbers_in_the_gym_992946_lrnkv6.jpg',
  instructions: [
    'Start in a high plank position with hands under shoulders.',
    'Drive one knee toward chest.',
    'Quickly switch legs in a running motion.',
    'Keep hips low and core engaged.'
  ],
tips: [
  'Keep your body in a straight line',
  'Drive your knees toward your chest',
  'Maintain a steady, controlled pace'
],
commonMistakes: [
  'Letting hips rise too high',
  'Bouncing or using momentum',
  'Not engaging the core'
],
variations: [
  'Cross-Body Mountain Climber',
  'Slow Mountain Climber'
]
},  

{
  id: 'cross-body-mountain-climber',
  name: 'Cross-Body Mountain Climber',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['abs', 'obliques'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760466642/Firefly_Someone_performing_Cross_Body_Mountain_Climbers_in_the_gym_262981_g4kmuw.jpg',
  instructions: [
    'Start in a high plank position.',
    'Drive one knee toward the opposite elbow.',
    'Alternate sides quickly in a running motion.',
    'Maintain strong plank form throughout.'
  ],
tips: [
  'Keep your core tight and back straight',
  'Drive your knee toward the opposite elbow',
  'Move with control, not speed'
],
commonMistakes: [
  'Letting hips rise or sag',
  'Using momentum instead of control',
  'Not crossing the knee far enough'
],
variations: [
  'Slow Cross-Body Mountain Climber',
  'Elevated Cross-Body Mountain Climber'
]
},  

{
  id: 'v-up',
  name: 'V-Up',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'advanced',
  equipment: ['bodyweight'],
  muscles: ['abs'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760466364/Firefly_Someone_lying_down_in_the_gym_751147_gmqbhj.jpg',
  instructions: [
    'Lie flat on back with arms overhead and legs extended.',
    'Lift legs and upper body simultaneously, reaching hands toward feet.',
    'Lower back down under control and repeat.'
  ],
tips: [
  'Keep your legs and arms straight',
  'Engage your core throughout the lift',
  'Move in a controlled motion'
],
commonMistakes: [
  'Using momentum',
  'Arching the lower back',
  'Not touching hands to feet'
],
variations: [
  'Bent-Knee V-Up',
  'Weighted V-Up'
]
},  

{
  id: 'jackknife',
  name: 'Jackknife',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'advanced',
  equipment: ['bodyweight'],
  muscles: ['abs'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760466130/Firefly_Someone_lying_on_their_back_in_the_gym_with_legs_in_the_air_992946_1_tsuspy.jpg',
  instructions: [
    'Lie flat with arms overhead and legs extended.',
    'Lift legs and arms at the same time, bringing hands toward feet.',
    'Contract abs at top, then lower slowly.'
  ],
tips: [
  'Engage your core before lifting',
  'Raise arms and legs together smoothly',
  'Control the movement both up and down'
],
commonMistakes: [
  'Using momentum',
  'Pulling on the neck',
  'Arching the lower back'
],
variations: [
  'Bent-Knee Jackknife',
  'Weighted Jackknife'
]
},  

{
  id: 'toe-touch',
  name: 'Toe Touch',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['abs'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760465999/Firefly_Someone_lying_on_their_back_in_the_gym_with_legs_in_the_air_720243_gznlak.jpg',
  instructions: [
    'Lie flat on your back with legs raised toward ceiling.',
    'Reach hands toward toes by lifting shoulders off the ground.',
    'Lower slowly and repeat.'
  ],
tips: [
  'Keep your legs straight and together',
  'Lift with your core, not your neck',
  'Exhale as you reach for your toes'
],
commonMistakes: [
  'Pulling on the neck',
  'Using momentum',
  'Not engaging the core fully'
],
variations: [
  'Weighted Toe Touch',
  'Alternating Toe Touch'
]
},  

{
  id: 'hanging-knee-raise',
  name: 'Hanging Knee Raise',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'intermediate',
  equipment: ['pull-up bar'],
  muscles: ['abs', 'hip flexors'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760465624/Firefly_Someone_performing_Hanging_Knee_Raise_in_the_gym_262981_doydfa.jpg',
  instructions: [
    'Hang from a pull-up bar with arms extended.',
    'Raise knees toward chest in a controlled motion.',
    'Lower slowly and repeat.'
  ],
tips: [
  'Engage your core before lifting',
  'Twist from your torso, not just your hips',
  'Lift knees slowly and controlled'
],
commonMistakes: [
  'Swinging the legs',
  'Using momentum instead of core',
  'Pulling on the arms or shoulders'
],
variations: [
  'Hanging Knee Raise',
  'Hanging Oblique Leg Raise'
]
},  

{
  id: 'hanging-knee-raise-with-twist',
  name: 'Hanging Knee Raise with Twist',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'advanced',
  equipment: ['pull-up bar'],
  muscles: ['abs', 'obliques'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760388737/Firefly_Someone_performing_Hanging_Knee_Raise_with_Twist_in_the_gym_550753_mvg3q4.jpg',
  instructions: [
    'Hang from pull-up bar with arms extended.',
    'Raise knees toward one side of chest, twisting torso.',
    'Lower slowly and alternate sides.'
  ],
tips: [
  'Engage your core before lifting',
  'Twist from your torso, not just your hips',
  'Lift knees slowly and controlled'
],
commonMistakes: [
  'Swinging the legs',
  'Using momentum instead of core',
  'Pulling on the arms or shoulders'
],
variations: [
  'Hanging Knee Raise',
  'Hanging Oblique Leg Raise'
]
},  

{
  id: 'bicycle-kick',
  name: 'Bicycle Kick',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['abs', 'obliques'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760388545/Firefly_Someone_performing_Bicycle_Kick_in_the_gym_48378_h9wex2.jpg',
  instructions: [
    'Lie flat on your back with hands behind head.',
    'Lift legs and alternate bringing knees toward chest in pedaling motion.',
    'Twist torso to bring opposite elbow toward knee.'
  ],
tips: [
  'Keep your core engaged',
  'Move slowly and controlled',
  'Keep your shoulders off the floor'
],
commonMistakes: [
  'Pulling on the neck',
  'Using momentum instead of core',
  'Not fully extending the legs'
],
variations: [
  'Slow Bicycle Crunch',
  'Weighted Bicycle Crunch'
]
},  

{
  id: 'lying-knee-tuck',
  name: 'Lying Knee Tuck',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'beginner',
  equipment: ['bodyweight'],
  muscles: ['abs'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760388383/Firefly_Someone_performing_Lying_Knee_Tuck_in_the_gym_788431_t159zb.jpg',
  instructions: [
    'Lie flat on back with legs extended.',
    'Bring knees toward chest while curling hips slightly off ground.',
    'Extend legs back out without touching floor.'
  ],
tips: [
  'Keep your lower back pressed into the floor',
  'Engage your core throughout the movement',
  'Move your knees slowly and controlled'
],
commonMistakes: [
  'Arching the lower back',
  'Using momentum instead of core',
  'Lifting shoulders or head off the floor'
],
variations: [
  'Weighted Lying Knee Tuck',
  'Single-Leg Lying Knee Tuck'
]
},  

{
  id: 'seated-in-and-outs',
  name: 'Seated In-and-Outs',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['abs', 'hip flexors'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760388147/Firefly_Someone_performing_Seated_In-and-Outs_in_the_gym_48378_vfeecb.jpg',
  instructions: [
    'Sit on floor with hands on ground behind you for support.',
    'Extend legs out straight and lean back slightly.',
    'Bring knees in toward chest and extend back out.',
    'Repeat while keeping core engaged.'
  ],
tips: [
  'Lean back slightly and keep your core engaged',
  'Move legs in and out slowly and controlled',
  'Keep your chest lifted'
],
commonMistakes: [
  'Rounding the back',
  'Using momentum instead of core',
  'Letting feet touch the ground between reps'
],
variations: [
  'Weighted Seated In-and-Outs',
  'Single-Leg Seated In-and-Outs'
]
},  

{
  id: 'stability-ball-knee-tuck',
  name: 'Stability Ball Knee Tuck',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'intermediate',
  equipment: ['stability ball'],
  muscles: ['abs', 'hip flexors'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760387999/Firefly_Someone_performing_Stability_Ball_Knee_Tuck_in_the_gym_558390_ewdte5.jpg',
  instructions: [
    'Start in push-up position with shins on a stability ball.',
    'Pull knees toward chest, rolling ball forward.',
    'Extend legs back out to starting position and repeat.'
  ],
tips: [
  'Keep your core tight',
  'Move slowly and controlled',
  'Keep shoulders stable on the floor'
],
commonMistakes: [
  'Letting hips sag',
  'Using momentum instead of core',
  'Dropping the shoulders or chest'
],
variations: [
  'Stability Ball Pike',
  'Single-Leg Stability Ball Knee Tuck'
]
},  

{
  id: 'ab-rollout',
  name: 'Ab Rollout',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'advanced',
  equipment: ['ab wheel', 'barbell'],
  muscles: ['abs'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760387923/Firefly_Someone_performing_Ab_Rollout_in_the_gym_558390_mgoueu.jpg',
  instructions: [
    'Kneel on floor holding ab wheel or barbell.',
    'Roll forward slowly, extending body as far as possible.',
    'Pull back using core to return to starting position.'
  ],
tips: [
  'Keep your core tight and back straight',
  'Roll out slowly and under control',
  'Engage your glutes and abs throughout'
],
commonMistakes: [
  'Arching the lower back',
  'Using momentum instead of strength',
  'Not going deep enough or too deep too fast'
],
variations: [
  'Kneeling Ab Rollout',
  'Standing Ab Rollout'
]
},  

{
  id: 'dead-bug',
  name: 'Dead Bug',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'beginner',
  equipment: ['bodyweight'],
  muscles: ['abs', 'transverse abdominis'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760387731/Firefly_Someone_performing_Dead_Bug_in_the_gym_330626_carw98.jpg',
  instructions: [
    'Lie flat on back with arms extended toward ceiling and legs raised.',
    'Lower one arm and opposite leg toward floor while keeping core engaged.',
    'Return to start and alternate sides.'
  ],
tips: [
  'Press your lower back into the floor',
  'Keep your core fully engaged',
  'Maintain straight arms and legs'
],
commonMistakes: [
  'Arching the lower back',
  'Holding breath',
  'Letting shoulders or legs drop too low'
],
variations: [
  'Tucked Hollow Hold',
  'Weighted Hollow Hold'
]
},  

{
  id: 'hollow-body-hold',
  name: 'Hollow Body Hold',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['abs'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760387629/Firefly_Someone_performing_Hollow_Body_Hold_in_the_gym_30310_jsimtz.jpg',
  instructions: [
    'Lie flat on back with arms overhead and legs extended.',
    'Lift shoulders and legs off ground, keeping lower back pressed down.',
    'Hold position while maintaining tension in core.'
  ],
  tips: [
  'Press your lower back into the floor',
  'Keep your core fully engaged',
  'Maintain straight arms and legs'
],
commonMistakes: [
  'Arching the lower back',
  'Holding breath',
  'Letting shoulders or legs drop too low'
],
variations: [
  'Tucked Hollow Hold',
  'Weighted Hollow Hold'
]
},  

{
  id: 'plank-with-knee-to-elbow',
  name: 'Plank with Knee to Elbow',
  category: 'core',
  subCategory: 'abs',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['abs', 'obliques'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760387499/Firefly_Someone_performing_Plank_with_Knee_to_Elbow_in_the_gym_483132_mkjh01.jpg',
  instructions: [
    'Start in a high plank position.',
    'Drive one knee toward elbow on the same side.',
    'Return to plank and alternate sides.',
    'Keep hips low and core tight.'
  ],
tips: [
  'Keep your core tight',
  'Bring your knee toward the same-side elbow',
  'Maintain a straight back throughout'
],
commonMistakes: [
  'Letting hips sag',
  'Not reaching the elbow',
  'Moving too fast'
],
variations: [
  'Plank with Alternating Knee to Elbow',
  'Spiderman Plank'
]
},  
{
  id: 'side-plank',
  name: 'Side Plank',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'beginner',
  equipment: ['bodyweight'],
  muscles: ['obliques', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760387321/Firefly_Someone_performing_Side_Plank_in_the_gym_330626_oreqsc.jpg',
  instructions: [
    'Lie on your side with legs stacked.',
    'Place elbow under shoulder and lift hips.',
    'Hold body in a straight line.',
    'Switch sides after time or reps.'
  ],
tips: [
  'Keep your body in a straight line',
  'Engage your core and glutes',
  'Stack your shoulders and hips'
],
commonMistakes: [
  'Letting hips drop',
  'Rotating forward or backward',
  'Holding your breath'
],
variations: [
  'Forearm Side Plank',
  'Side Plank with Leg Lift'
]
},

{
  id: 'side-plank-hip-dip',
  name: 'Side Plank Hip Dip',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['obliques', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760387214/Firefly_Someone_performing_Side_Plank_Hip_Dip_in_the_gym_483132_tavvwv.jpg',
  instructions: [
    'Get into a side plank position.',
    'Lower hips toward floor in a controlled dip.',
    'Raise back up and repeat.',
    'Switch sides after time or reps.'
  ],
tips: [
  'Keep your body in a straight line',
  'Engage your core and glutes',
  'Lower your hips with control'
],
commonMistakes: [
  'Letting hips sag',
  'Rotating the torso',
  'Rushing the movement'
],
variations: [
  'Forearm Side Plank Hip Dip',
  'Weighted Side Plank Hip Dip'
]
},

{
  id: 'russian-twist',
  name: 'Russian Twist',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'intermediate',
  equipment: ['bodyweight', 'medicine ball', 'dumbbell'],
  muscles: ['obliques', 'abs'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760385355/Firefly_Someone_performing_Russian_Twist_in_the_gym_483132_utwjl2.jpg',
  instructions: [
    'Sit with knees bent and lean back slightly.',
    'Hold weight or clasp hands together.',
    'Twist torso side to side, touching floor lightly each side.'
  ],
tips: [
  'Keep your back straight',
  'Engage your core throughout',
  'Twist your torso, not just your arms'
],
commonMistakes: [
  'Rounding the back',
  'Swinging arms without twisting',
  'Moving too fast'
],
variations: [
  'Weighted Russian Twist',
  'Feet-Elevated Russian Twist'
]
},

{
  id: 'side-crunch',
  name: 'Side Crunch',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'beginner',
  equipment: ['bodyweight'],
  muscles: ['obliques'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760385221/Firefly_Someone_performing_Side_Crunch_in_the_gym_483132_xo66ax.jpg',
  instructions: [
    'Lie on your side with knees slightly bent.',
    'Place hand behind head.',
    'Crunch torso upward to bring ribcage toward hip.',
    'Lower slowly and repeat.'
  ],
tips: [
  'Focus on squeezing your obliques',
  'Keep your movements controlled',
  'Exhale as you crunch up'
],
commonMistakes: [
  'Pulling on your neck',
  'Using momentum',
  'Not fully engaging the core'
],
variations: [
  'Bicycle Crunch',
  'Stability Ball Side Crunch'
]
},

{
  id: 'standing-side-bend',
  name: 'Standing Side Bend',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'beginner',
  equipment: ['bodyweight'],
  muscles: ['obliques'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760385097/Firefly_Someone_performing_Standing_Side_Bend_in_the_gym_562473_lnviad.jpg',
  instructions: [
    'Stand tall with feet shoulder-width apart.',
    'Place one hand on hip, the other overhead.',
    'Bend sideways at waist toward grounded hand.',
    'Return to start and repeat on other side.'
  ],
tips: [
  'Keep your chest up and core tight',
  'Bend only at the waist',
  'Move in a slow, controlled motion'
],
commonMistakes: [
  'Leaning forward or backward',
  'Using momentum to bend',
  'Not engaging the obliques'
],
variations: [
  'Dumbbell Side Bend',
  'Cable Side Bend'
]
},

{
  id: 'dumbbell-side-bend',
  name: 'Dumbbell Side Bend',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'beginner',
  equipment: ['dumbbell'],
  muscles: ['obliques'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760384997/Firefly_Someone_performing_Dumbbell_Side_Bend_in_the_gym_30310_ka6vnm.jpg',
  instructions: [
    'Stand tall holding a dumbbell in one hand at side.',
    'Bend sideways at waist toward dumbbell.',
    'Return upright and repeat for reps.',
    'Switch sides.'
  ],
tips: [
  'Keep your torso upright',
  'Lower the dumbbell slowly',
  'Squeeze your obliques at the top'
],
commonMistakes: [
  'Leaning forward or backward',
  'Using momentum',
  'Shrugging the shoulder'
],
variations: [
  'Cable Side Bend',
  'Seated Dumbbell Side Bend'
]
},

{
  id: 'cable-woodchopper',
  name: 'Cable Woodchopper',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'intermediate',
  equipment: ['cable machine'],
  muscles: ['obliques', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760384502/Firefly_Someone_performing_Cable_Woodchopper_in_the_gym_483132_mefjkc.jpg',
  instructions: [
    'Set cable handle at chest height.',
    'Stand sideways to machine and grasp handle.',
    'Rotate torso, pulling handle across body.',
    'Control return to start and repeat.'
  ],
tips: [
  'Rotate through your torso',
  'Keep your core tight',
  'Control both directions'
],
commonMistakes: [
  'Using arms instead of core',
  'Over-rotating hips',
  'Letting the cable pull you back'
],
variations: [
  'High-to-Low Cable Woodchopper',
  'Low-to-High Cable Woodchopper'
]
},

{
  id: 'low-to-high-cable-woodchopper',
  name: 'Low-to-High Cable Woodchopper',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'intermediate',
  equipment: ['cable machine'],
  muscles: ['obliques', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760384066/Firefly_Someone_performing_High-to-Low_Cable_Woodchopper_in_the_gym_483132_ywbbh9.jpg',
  instructions: [
    'Set cable handle at low position.',
    'Stand sideways and grab handle with both hands.',
    'Pull cable upward across body in diagonal motion.',
    'Return slowly and repeat.'
  ],
tips: [
  'Drive the motion with your core',
  'Keep arms extended but not locked',
  'Finish high with full rotation'
],
commonMistakes: [
  'Using arms too much',
  'Leaning instead of rotating',
  'Losing control on the way down'
],
variations: [
  'High-to-Low Cable Woodchopper',
  'Kneeling Cable Woodchopper'
]
},

{
  id: 'high-to-low-cable-woodchopper',
  name: 'High-to-Low Cable Woodchopper',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'intermediate',
  equipment: ['cable machine'],
  muscles: ['obliques', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760384286/Firefly_Someone_performing_High-To-Low_Cable_Woodchopper_in_the_gym_562473_lnkqyx.jpg',
  instructions: [
    'Set cable handle at high position.',
    'Stand sideways and grab handle with both hands.',
    'Pull cable downward across body in diagonal motion.',
    'Return slowly and repeat.'
  ],
tips: [
  'Rotate from your core',
  'Keep arms straight but relaxed',
  'Control the pull and return'
],
commonMistakes: [
  'Using arms instead of core',
  'Twisting the lower back',
  'Letting the cable snap back'
],
variations: [
  'Low-to-High Cable Woodchopper',
  'Kneeling Cable Woodchopper'
]
},

{
  id: 'landmine-twist',
  name: 'Landmine Twist',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'intermediate',
  equipment: ['landmine'],
  muscles: ['obliques', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760383974/Firefly_Someone_performing_Landmine_Twist_with_a_bar_in_the_gym_562473_glsafp.jpg',
  instructions: [
    'Stand holding end of landmine bar with both hands.',
    'Keep arms extended and rotate bar side to side.',
    'Engage core and control movement.'
  ],
tips: [
  'Rotate through your torso',
  'Keep arms slightly bent',
  'Move with control'
],
commonMistakes: [
  'Using arms instead of core',
  'Over-rotating hips',
  'Rushing the movement'
],
variations: [
  'Half-Kneeling Landmine Twist',
  'Single-Arm Landmine Twist'
]
},

{
  id: 'landmine-180s',
  name: 'Landmine 180s',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'advanced',
  equipment: ['landmine'],
  muscles: ['obliques', 'abs', 'shoulders'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760383841/Firefly_Someone_performing_Landmine_180s_with_a_bar_in_the_gym_483132_ythtlz.jpg',
  instructions: [
    'Stand holding end of landmine bar with both hands.',
    'Rotate bar explosively from one hip to the other in an arc.',
    'Engage core throughout movement.'
  ],
tips: [
  'Rotate from your hips',
  'Keep your core tight',
  'Control the bar'
],
commonMistakes: [
  'Using only arms',
  'Locking knees',
  'Swinging too fast'
],
variations: [
  'Half-Kneeling Landmine Rotation',
  'Single-Arm Landmine Rotation'
]
},

{
  id: 'oblique-v-up',
  name: 'Oblique V-Up',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['obliques'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760383659/Firefly_Someone_performing_Oblique_V-Up_in_the_gym_30310_xhkmoh.jpg',
  instructions: [
    'Lie on side with bottom arm extended on floor.',
    'Lift legs and torso simultaneously, reaching top hand toward feet.',
    'Lower slowly and repeat.'
  ],
  tips: [
    'Keep your hips stacked',
    'Engage your core before lifting',
    'Point your toes slightly forward'
  ],
  commonMistakes: [
    'Pulling on your neck',
    'Using momentum',
    'Letting your body roll backward'
  ],    
  variations: [
    'Knee Oblique V-Up',
    'Side-Lying Crunch'
  ]
},

{
  id: 'side-jackknife',
  name: 'Side Jackknife',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['obliques'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760382975/Firefly_Someone_performing_Side_Jackknife_in_the_gym_562473_vj9p3x.jpg',
  instructions: [
    'Lie on side with top hand behind head.',
    'Bring knees and elbow toward each other while lifting torso and legs.',
    'Lower slowly and repeat.'
  ],
  tips: [
    'Keep your core tight',
    'Lift with control',
    'Keep tension constant'
  ],
  commonMistakes: [
    'Pulling on your neck',
    'Using momentum',
    'Letting your torso roll forward/backward'
  ],    
  variations: [
    'Bent-Knee Side Jackknife',
    'Seated Side Crunch'
  ]
},

{
  id: 'hanging-oblique-leg-raise',
  name: 'Hanging Oblique Leg Raise',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'advanced',
  equipment: ['pull-up bar'],
  muscles: ['obliques', 'abs'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760382761/Firefly_Someone_performing_Hanging_Oblique_Leg_Raise_in_the_gym_562473_nablzn.jpg',
  instructions: [
    'Hang from pull-up bar with arms extended.',
    'Lift legs toward one side in controlled motion.',
    'Lower slowly and alternate sides.'
  ],
  tips: [
    'Engage your lats',
    'Control the swing',
    'Control the swing'
  ],
  commonMistakes: [
    'Using momentum or swinging',
    'Not rotating the torso',
    'Arching your back at the bottom'
  ],    
  variations: [
    'Hanging Knee Raise with Twist',
    'Lying Windshield Wipers'
  ]
},

{
  id: 'side-to-side-medicine-ball-slam',
  name: 'Side-to-Side Medicine Ball Slam',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'intermediate',
  equipment: ['medicine ball'],
  muscles: ['obliques', 'abs', 'shoulders'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760382564/Firefly_Someone_performing_Side-to-Side_Medicine_Ball_Slams_in_the_gym_483132_vtk1fu.jpg',
  instructions: [
    'Hold medicine ball overhead.',
    'Rotate and slam ball forcefully to the side onto floor.',
    'Catch ball on rebound and repeat opposite side.'
  ],
  tips: [
    'Bend knees if jumping',
    'Do not over extend',
    'stick to the basics'
  ],
  commonMistakes: [
    'Using Momentum',
    'Not bending knees'
  ],    
  variations: [
    'Cable Woodchoppers',
    'Russian Twists'
  ]
},

{
  id: 'rotational-medicine-ball-throw',
  name: 'Rotational Medicine Ball Throw',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'intermediate',
  equipment: ['medicine ball', 'wall'],
  muscles: ['obliques', 'core'],
  imageUrl: '',
  instructions: [
    'Stand sideways a few feet from wall holding medicine ball.',
    'Rotate torso and throw ball explosively at wall.',
    'Catch rebound and repeat.'
  ],
  tips: [
    'Keep Palms flat on the floor',
    'Keep head back',
    'stick to the basics'
  ],
  commonMistakes: [
    'Using Momentum',
    'Twisting whole body',
    'Arching Back'
  ],    
  variations: [
    'Hanging Leg-Raises',
    'Side Plank'
  ]
},

{
  id: 'windshield-wiper',
  name: 'Windshield Wiper',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'advanced',
  equipment: ['bodyweight'],
  muscles: ['obliques', 'abs'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760043071/Firefly_A_photo_of_a_real_person_in_the_gym_lying_back_on_the_floor_with_arms_out_and_legs_i_374596_qzcvwa.jpg',
  instructions: [
    'Lie on back with arms out for stability and legs raised.',
    'Lower legs side to side in a controlled arc.',
    'Keep core engaged and legs straight.'
  ],
  tips: [
    'Keep Palms flat on the floor',
    'Keep head back',
    'stick to the basics'
  ],
  commonMistakes: [
    'Using Momentum',
    'Twisting whole body',
    'Arching Back'
  ],    
  variations: [
    'Hanging Leg-Raises',
    'Side Plank'
  ]
},

{
  id: 'pallof-press-with-rotation',
  name: 'Pallof Press with Rotation',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'intermediate',
  equipment: ['cable machine', 'resistance band'],
  muscles: ['obliques', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760040830/Firefly_A_photo_of_a_real_person_in_the_gym_standing_by_the_cable_machine._Pulling_one_cable_693890_hcwvmj.jpg',
  instructions: [
    'Stand perpendicular to cable machine holding handle at chest.',
    'Press handle straight out in front of body.',
    'Rotate torso slowly to one side, resisting pull of cable.',
    'Return to start and repeat other side.'
  ],
  tips: [
    'Keep elbows slightly bent',
    'Do not over extend',
    'stick to the basics'
  ],
  commonMistakes: [
    'Using Momentum',
    'Twisting whole body',
    'Arching Back'
  ],    
  variations: [
    'Russian Twists',
    'Bicycle Twists'
  ]
},

{
  id: 'twisting-mountain-climber',
  name: 'Twisting Mountain Climber',
  category: 'core',
  subCategory: 'obliques',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['obliques', 'abs'],
  imageUrl: 'https://images.pexels.com/photos/6516165/pexels-photo-6516165.jpeg',
  instructions: [
    'Start in high plank position.',
    'Drive one knee toward opposite elbow.',
    'Alternate sides in a quick, running motion.',
    'Maintain strong plank position throughout.'
  ],
  tips: [
    'Do not lock elbows',
    'Tense core to deter back curve',
    'stick to the basics'
  ],
  commonMistakes: [
    'Using Momentum',
    'Bending Elbows too much',
    'Arching Back'
  ],    
  variations: [
    'Scissor Kicks',
    'Flutter Kicks'
  ]
},
{
  id: 'leg-raise',
  name: 'Leg Raise',
  category: 'core',
  subCategory: 'lower abs',
  difficulty: 'beginner',
  equipment: ['bodyweight'],
  muscles: ['lower abs', 'core'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760039907/Firefly_a_real_person_in_the_gym_lying_down_flat_on_the_floor_on_their_back._Lifting_one_le_684394_elf5cq.jpg',
  instructions: [
    'Lie on your back with legs extended.',
    'Place hands under glutes for support.',
    'Lift legs toward the ceiling, keeping them straight.',
    'Lower slowly without touching floor.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Using Momentum',
    'Touching Floor With Feet',
    'Arching Back'
  ],    
  variations: [
    'Scissor Kicks',
    'Flutter Kicks'
  ]
},

{
  id: 'flutter-kick',
  name: 'Flutter Kick',
  category: 'core',
  subCategory: 'lower abs',
  difficulty: 'beginner',
  equipment: ['bodyweight'],
  muscles: ['lower abs', 'hip flexors'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1760039482/Firefly_a_real_person_in_the_gym_lying_down_flat_on_the_floor_721757_grsdhq.jpg',
  instructions: [
    'Lie on your back with legs extended.',
    'Lift legs slightly off the floor.',
    'Quickly alternate small up-and-down kicks.',
    'Keep lower back pressed into the floor.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Using Momentum',
    'Touching Floor With Feet',
    'Arching Back'
  ],    
  variations: [
    'Scissor Kicks',
    'Lying Leg Raise'
  ]
},

{
  id: 'scissor-kick',
  name: 'Scissor Kick',
  category: 'core',
  subCategory: 'lower abs',
  difficulty: 'beginner',
  equipment: ['bodyweight'],
  muscles: ['lower abs', 'hip flexors'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1759869580/Firefly_Someone_in_the_gym_lying_flat_on_the_floor_on_their_back_lifting_one_leg_in_the_ai_752159_mfmfms.jpg',
  instructions: [
    'Lie on your back with legs extended.',
    'Lift both legs slightly off floor.',
    'Cross legs over and under in a scissor motion.',
    'Maintain steady breathing and core engagement.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Using Momentum',
    'Touching Floor With Feet',
    'Arching Back'
  ],    
  variations: [
    'Butterfly Kicks',
    'Lying Leg Raise'
  ]
},

{
  id: 'cross-body-mountain-climber',
  name: 'Cross-Body Mountain Climber',
  category: 'core',
  subCategory: 'lower abs',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['lower abs', 'obliques'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1759868545/Firefly_Someone_performing_Mountain_Climber_exercise_for_core_in_the_gym._596790_trykq6.jpg',
  instructions: [
    'Start in high plank position.',
    'Drive one knee across body toward opposite elbow.',
    'Return to start and switch legs quickly.',
    'Maintain strong plank throughout.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Using Momentum',
    'Palms Not Flat',
    'Arching Back'
  ],    
  variations: [
    'Plank',
    'Mountain Climbers'
  ]
},

{
  id: 'v-up',
  name: 'V-Up',
  category: 'core',
  subCategory: 'lower abs',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['lower abs', 'upper abs'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1759868391/Firefly_Someone_performing_a_V_sit-up_V-up_in_the_gym._Legs_out_straight_and_upwards_while_154275_1_nmngxi.jpg',
  instructions: [
    'Lie on your back with arms extended overhead.',
    'Simultaneously lift legs and torso to meet in a V shape.',
    'Reach hands toward feet.',
    'Lower with control and repeat.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Using Momentum',
    'Pulling Motion',
    'Arching Back'
  ],    
  variations: [
    'Jackknife',
    'Crunches'
  ]
},

{
  id: 'jackknife',
  name: 'Jackknife',
  category: 'core',
  subCategory: 'lower abs',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['lower abs', 'upper abs'],
  imageUrl: 'https://images.pexels.com/photos/4720550/pexels-photo-4720550.jpeg',
  instructions: [
    'Lie on your back with arms overhead and legs extended.',
    'Bring legs and arms up together, folding at the hips.',
    'Try to touch hands to shins or feet.',
    'Lower back down slowly.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Using Momentum',
    'Pulling Motion',
    'Arching Back'
  ],
  variations: [
    'Decline situps',
    'Hanging leg raises'
  ]
},

{
  id: 'hanging-knee-raise',
  name: 'Hanging Knee Raise',
  category: 'core',
  subCategory: 'lower abs',
  difficulty: 'intermediate',
  equipment: ['pull-up bar'],
  muscles: ['lower abs', 'hip flexors'],
  imageUrl: 'https://images.pexels.com/photos/12895269/pexels-photo-12895269.jpeg',
  instructions: [
    'Hang from a pull-up bar with arms fully extended.',
    'Pull knees upward toward chest.',
    'Lower slowly back to starting position.',
    'Avoid swinging legs.'
  ],
  tips: [
    'Use step to maintain stability when grabbing bar',
    'Tilt hips to engage core so glutes face upwards',
    'Progressive overload when needed'
  ],
  commonMistakes: [
    'Using Momentum',
    'Lifting legs wihtout rotating back',
    'Not adding when needed'
  ],
  variations: [
    'Decline situps',
    'Hanging leg raises'
  ]
},

{
  id: 'hanging-knee-raise-with-twist',
  name: 'Hanging Knee Raise with Twist',
  category: 'core',
  subCategory: 'lower abs',
  difficulty: 'advanced',
  equipment: ['pull-up bar'],
  muscles: ['lower abs', 'obliques'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1758831405/ChatGPT_Image_Sep_25_2025_09_16_33_PM_xjatmy.png',
  instructions: [
    'Hang from a pull-up bar with arms extended.',
    'Pull knees upward while twisting hips to one side.',
    'Lower slowly and alternate sides.',
    'Control motion to avoid swinging.'
  ],
  tips: [
    'Use step to maintain stability when grabbing bar',
    'Tilt hips to engage core so glutes face upwards',
    'Progressive overload when needed'
  ],
  commonMistakes: [
    'Using Momentum',
    'Lifting legs wihtout rotating back',
    'Not adding when needed'
  ],
  variations: [
    'Decline situps',
    'Hanging leg raises'
  ]
},

{
  id: 'bicycle-kick',
  name: 'Bicycle Kick',
  category: 'core',
  subCategory: 'lower abs',
  difficulty: 'beginner',
  equipment: ['bodyweight'],
  muscles: ['lower abs', 'obliques'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1758830706/ChatGPT_Image_Sep_25_2025_09_04_45_PM_tgxlqp.png',
  instructions: [
    'Lie on your back with hands behind head.',
    'Lift legs and alternate pedaling motion.',
    'Bring opposite elbow toward knee each cycle.',
    'Keep core tight and controlled.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Overexertion',
    'Not stretching',
    'Not staying hydrated'
  ],
  variations: [
    'Scissor kicks',
    'Heel Touches'
  ]
},

{
  id: 'lying-knee-tuck',
  name: 'Lying Knee Tuck',
  category: 'core',
  subCategory: 'lower abs',
  difficulty: 'beginner',
  equipment: ['bodyweight'],
  muscles: ['lower abs'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1758830405/ChatGPT_Image_Sep_25_2025_08_59_54_PM_b5jmon.png',
  instructions: [
    'Lie on your back with legs extended.',
    'Bend knees and pull them toward chest.',
    'Extend legs back out without touching floor.',
    'Repeat smoothly.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Overexertion',
    'Not stretching',
    'Not staying hydrated'
  ],
  variations: [
    'Scissor kicks',
    'Heel Touches'
  ]
},

{
  id: 'seated-in-and-outs',
  name: 'Seated In-and-Outs',
  category: 'core',
  subCategory: 'lower abs',
  difficulty: 'beginner',
  equipment: ['bodyweight'],
  muscles: ['lower abs'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1758829106/ChatGPT_Image_Sep_25_2025_08_35_19_PM_gxmnyz.png',
  instructions: [
    'Sit on floor with hands behind for support.',
    'Extend legs outward, hovering above ground.',
    'Tuck knees toward chest, then extend again.',
    'Repeat continuously.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Overexertion',
    'Not stretching',
    'Not staying hydrated'
  ],
  variations: [
    'V Situps',
    'Crunches'
  ]
},

{
  id: 'stability-ball-knee-tuck',
  name: 'Stability Ball Knee Tuck',
  category: 'core',
  subCategory: 'lower abs',
  difficulty: 'intermediate',
  equipment: ['stability ball'],
  muscles: ['lower abs', 'hip flexors'],
  imageUrl: 'https://images.pexels.com/photos/8032785/pexels-photo-8032785.jpeg',
  instructions: [
    'Start in push-up position with shins on stability ball.',
    'Roll ball toward chest by bending knees.',
    'Extend legs back to start.',
    'Keep core tight throughout.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Overexertion',
    'Not stretching',
    'Not staying hydrated'
  ],
  variations: [
    'Plank',
    'Mountain Climbers'
  ]
},

{
  id: 'plank-with-knee-to-elbow',
  name: 'Plank with Knee to Elbow',
  category: 'core',
  subCategory: 'lower abs',
  difficulty: 'intermediate',
  equipment: ['bodyweight'],
  muscles: ['lower abs', 'obliques'],
  imageUrl: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg',
  instructions: [
    'Begin in high plank position.',
    'Drive one knee toward same-side elbow.',
    'Return leg and repeat with opposite side.',
    'Maintain a strong plank posture.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Overexertion',
    'Not stretching',
    'Not staying hydrated'
  ],
  variations: [
    'Plank',
    'Mountain Climbers'
  ]
},
{
  id: 'running',
  name: 'Running',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'beginner',
  equipment: ['none'],
  muscles: ['legs', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/27948294/pexels-photo-27948294.jpeg',
  instructions: [
    'Start with a light warm-up jog.',
    'Run at a steady pace.',
    'Maintain upright posture and steady breathing.',
    'Cool down after finishing.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Overexertion',
    'Not stretching',
    'Not staying hydrated'
  ],
  variations: [
    'Sprinting',
    'Jogging'
  ]
},

{
  id: 'sprinting',
  name: 'Sprinting',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'advanced',
  equipment: ['none'],
  muscles: ['legs', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/3757957/pexels-photo-3757957.jpeg',
  instructions: [
    'Begin with a dynamic warm-up.',
    'Run at maximum effort for a short distance.',
    'Drive knees high and pump arms.',
    'Rest and repeat for intervals.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Overexertion',
    'Not stretching',
    'Not staying hydrated'
  ],
  variations: [
    'Running',
    'Jogging'
  ]
},

{
  id: 'jogging',
  name: 'Jogging',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'beginner',
  equipment: ['none'],
  muscles: ['legs', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/3601094/pexels-photo-3601094.jpeg',
  instructions: [
    'Run at a slow to moderate pace.',
    'Keep posture relaxed and upright.',
    'Breathe rhythmically.',
    'Cool down with a walk after.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Overexertion',
    'Not stretching',
    'Not staying hydrated'
  ],
  variations: [
    'Running',
    'Sprinting'
  ]
},

{
  id: 'cycling',
  name: 'Cycling',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'beginner',
  equipment: ['bicycle', 'stationary bike'],
  muscles: ['legs', 'glutes', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/13896069/pexels-photo-13896069.jpeg',
  instructions: [
    'Sit on bike with proper seat height.',
    'Pedal smoothly at a steady pace.',
    'Adjust resistance or terrain for intensity.',
    'Maintain steady breathing.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Overexertion',
    'Not stretching',
    'Not staying hydrated'
  ],
  variations: [
    'Kettlebell Swings',
    'Cross Training'
  ]
},

{
  id: 'jump-rope',
  name: 'Jump Rope',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'beginner',
  equipment: ['jump rope'],
  muscles: ['legs', 'shoulders', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/5750636/pexels-photo-5750636.jpeg',
  instructions: [
    'Hold rope handles at your sides.',
    'Swing rope overhead and jump as it passes under feet.',
    'Keep jumps low and controlled.',
    'Maintain a steady rhythm.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Overexertion',
    'Not stretching',
    'Not staying hydrated'
  ],
  variations: [
    'High Knees',
    'Mountain Climbers'
  ]
},

{
  id: 'rowing',
  name: 'Rowing',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'intermediate',
  equipment: ['rowing machine'],
  muscles: ['back', 'legs', 'arms', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/7690218/pexels-photo-7690218.jpeg',
  instructions: [
    'Sit on rowing machine and grab handles.',
    'Drive with legs, lean back slightly, and pull handle to chest.',
    'Return with arms first, then lean forward, then legs.',
    'Maintain smooth rhythm.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Overexertion',
    'Not stretching',
    'Not staying hydrated'
  ],
  variations: [
    'Elliptical Training',
    'Stair Master'
  ]
},

{
  id: 'swimming',
  name: 'Swimming',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'intermediate',
  equipment: ['pool'],
  muscles: ['full body', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/1415810/pexels-photo-1415810.jpeg',
  instructions: [
    'Choose a swimming stroke.',
    'Move continuously through the water.',
    'Maintain breathing rhythm with strokes.',
    'Swim laps or intervals as desired.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Overexertion',
    'Not stretching',
    'Not staying hydrated'
  ],
  variations: [
    'Freestyle',
    'Timed Laps'
  ]
},

{
  id: 'hiking',
  name: 'Hiking',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'beginner',
  equipment: ['hiking shoes'],
  muscles: ['legs', 'glutes', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg',
  instructions: [
    'Select a trail suitable for your fitness level.',
    'Walk uphill and downhill at a steady pace.',
    'Use trekking poles if needed.',
    'Stay hydrated throughout hike.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Overexertion',
    'Not stretching',
    'Not staying hydrated'
  ],
  variations: [
    'Stair Machine',
    'Mountain Climbers'
  ]
},

{
  id: 'stair-climbing',
  name: 'Stair Climbing',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'intermediate',
  equipment: ['stairs', 'stair machine'],
  muscles: ['legs', 'glutes', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/4804019/pexels-photo-4804019.jpeg',
  instructions: [
    'Step up each stair with even pacing.',
    'Keep posture upright and core engaged.',
    'Avoid skipping steps to reduce strain.',
    'Continue for set time or distance.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Overexertion',
    'Not stretching'
  ],
  variations: [
    'Stair Machine',
    'Mountain Climbers'
  ]
},

{
  id: 'elliptical-training',
  name: 'Elliptical Training',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'beginner',
  equipment: ['elliptical machine'],
  muscles: ['legs', 'glutes', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/6551093/pexels-photo-6551093.jpeg?_gl=1*1mbuimv*_ga*MTQwMTEzMTA4MC4xNzU5ODYzMjgx*_ga_8JE65Q40S6*czE3NTk4NjMyODEkbzEkZzEkdDE3NTk4NjMzMDEkajQwJGwwJGgw',
  instructions: [
    'Step onto elliptical and grip handles.',
    'Pedal forward in a smooth motion.',
    'Adjust resistance or incline for intensity.',
    'Maintain steady pace and breathing.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Overexertion',
    'Not stretching'
  ],
  variations: [
    'Stair Climber',
    'Cycle Machine'
  ]
},

{
  id: 'high-knees',
  name: 'High Knees',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'beginner',
  equipment: ['none'],
  muscles: ['legs', 'core', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/6339342/pexels-photo-6339342.jpeg',
  instructions: [
    'Stand tall with feet hip-width apart.',
    'Run in place while driving knees toward chest.',
    'Pump arms in rhythm.',
    'Maintain quick, controlled motion.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Not using equipment',
    'Overexertion',
    'Not stretching'
  ],
  variations: [
    'Star Jumps',
    'Mountain Climbers'
  ]
},

{
  id: 'butt-kicks',
  name: 'Butt Kicks',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'beginner',
  equipment: ['none'],
  muscles: ['legs', 'hamstrings', 'cardiovascular system'],
  imageUrl: 'https://res.cloudinary.com/dksanwxgl/image/upload/v1758657500/Firefly_can_you_generate_me_a_picture_of_someone_performing_leg_warm_ups_733170_vssjqt.jpg',
  instructions: [
    'Stand with feet hip-width apart.',
    'Jog in place while kicking heels toward glutes.',
    'Keep core engaged and steady pace.',
    'Continue for set time or reps.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Not using equipment',
    'Overexertion',
    'Not stretching'
  ],
  variations: [
    'Star Jumps',
    'Burpees'
  ]
},

{
  id: 'jumping-jacks',
  name: 'Jumping Jacks',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'beginner',
  equipment: ['none'],
  muscles: ['legs', 'shoulders', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/4853080/pexels-photo-4853080.jpeg',
  instructions: [
    'Stand upright with feet together and arms at sides.',
    'Jump while spreading legs and raising arms overhead.',
    'Return to start and repeat rhythmically.',
    'Maintain steady breathing.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Not using equipment',
    'Overexertion',
    'Not stretching'
  ],
  variations: [
    'Star Jumps',
    'Burpees'
  ]
},

{
  id: 'burpees',
  name: 'Burpees',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'intermediate',
  equipment: ['none'],
  muscles: ['full body', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/6999016/pexels-photo-6999016.jpeg',
  instructions: [
    'Start standing, then squat down and place hands on floor.',
    'Kick feet back into plank position.',
    'Perform a push-up, then jump feet forward.',
    'Explosively jump upward to finish.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Not using equipment',
    'Overexertion',
    'Not stretching'
  ],
  variations: [
    'Star Jumps',
    'Jumping Jacks'
  ]
},

{
  id: 'mountain-climbers',
  name: 'Mountain Climbers',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'intermediate',
  equipment: ['none'],
  muscles: ['core', 'legs', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg',
  instructions: [
    'Begin in high plank position.',
    'Drive one knee toward chest, then switch legs quickly.',
    'Alternate in running motion while keeping hips low.',
    'Maintain steady pace.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Overexertion',
    'Not stretching'
  ],
  variations: [
    'Plank Jacks',
    'Jumping Jacks'
  ]
},

{
  id: 'skater-jumps',
  name: 'Skater Jumps',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'intermediate',
  equipment: ['none'],
  muscles: ['legs', 'glutes', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/175708/pexels-photo-175708.jpeg',
  instructions: [
    'Stand on one leg and jump sideways to opposite leg.',
    'Land softly and balance briefly.',
    'Swing arms naturally with each jump.',
    'Continue alternating sides.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Overexertion',
    'Not stretching'
  ],
  variations: [
    'Speed Jumps',
    'Box Jumps'
  ]
},

{
  id: 'shadow-boxing',
  name: 'Shadow Boxing',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'beginner',
  equipment: ['none'],
  muscles: ['shoulders', 'arms', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/8810062/pexels-photo-8810062.jpeg',
  instructions: [
    'Stand in a boxing stance.',
    'Throw light punches into the air.',
    'Move around as if sparring.',
    'Maintain steady pace and rhythm.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Not using equipment',
    'Overexertion',
    'Not stretching'
  ],
  variations: [
    'Boxing',
    'Muay Thai'
  ]
},

{
  id: 'kickboxing',
  name: 'Kickboxing',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'intermediate',
  equipment: ['none'],
  muscles: ['legs', 'arms', 'core', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/4753923/pexels-photo-4753923.jpeg',
  instructions: [
    'Adopt a fighting stance.',
    'Perform combinations of punches and kicks.',
    'Move continuously while engaging core.',
    'Repeat for rounds or time.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Not using equipment',
    'Overexertion',
    'Not stretching'
  ],
  variations: [
    'Boxing',
    'Muay Thai'
  ]
},

{
  id: 'dance-cardio',
  name: 'Dance Cardio',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'beginner',
  equipment: ['none'],
  muscles: ['full body', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/864990/pexels-photo-864990.jpeg',
  instructions: [
    'Play upbeat music.',
    'Follow choreographed dance moves or freestyle.',
    'Move continuously to keep heart rate elevated.',
    'Have fun while maintaining pace.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Not controlling breathing',
    'Overexertion',
    'Not stretching'
  ]
},

{
  id: 'circuit-training',
  name: 'Circuit Training',
  category: 'cardio',
  subCategory: 'cardio',
  difficulty: 'intermediate',
  equipment: ['varies'],
  muscles: ['full body', 'cardiovascular system'],
  imageUrl: 'https://images.pexels.com/photos/4720537/pexels-photo-4720537.jpeg',
  instructions: [
    'Select a series of exercises.',
    'Perform each for set time or reps with little rest.',
    'Cycle through exercises in order.',
    'Repeat for desired number of rounds.'
  ],
  tips: [
    'Warm up',
    'Perform safely',
    'stick to the basics'
  ],
  commonMistakes: [
    'Not controlling breathing',
    'Overexertion',
    'Not stretching'
  ],
  variations: [
    'Fartlek training',
    'interval training'
  ]
}
  ]
};

// Sample tips
export const tips: Tip[] = [
  {
    id: '1',
    title: 'Stay Hydrated',
    content: 'Drink at least 8 glasses of water daily to support your metabolism and recovery.',
    icon: '💧',
  },
  {
    id: '2',
    title: 'Progressive Overload',
    content: 'Gradually increase weight, reps, or intensity to continue making progress.',
    icon: '📈',
  },
  {
    id: '3',
    title: 'Rest Days Matter',
    content: 'Your muscles grow during rest, not just during workouts. Take 1-2 rest days per week.',
    icon: '😴',
  },
  {
    id: '4',
    title: 'Protein Timing',
    content: 'Consume protein within 30 minutes after your workout for optimal muscle recovery.',
    icon: '🥩',
  },
  {
    id: '5',
    title: 'Form Over Weight',
    content: 'Perfect your form before increasing weight to prevent injury and maximize results.',
    icon: '✅',
  },
];
