// =============================================
//  AVOCADO COOKS — Recipe Data
//  ✏️  ADD OR EDIT YOUR RECIPES HERE
//
//  Each recipe must have:
//    id          — unique number
//    image       — path like "/images/recipe-name.jpg"
//    category    — e.g. "Chicken", "Vegetarian", "Pastry"
//    en          — English fields
//    ar          — Arabic fields
//
//  Place recipe images in:  public/images/
// =============================================

export const recipes = [
  {
  id: 1,
  image: "/images/pasta-bechamel.jpg",
  category: "Pasta",

  en: {
    title: "Pasta with Béchamel Sauce",
    description: "Creamy pasta with homemade béchamel sauce and mozzarella cheese.",

    ingredients: [
      "Butter",
      "All-purpose flour",
      "Milk",
      "Salt",
      "Red chili flakes",
      "Oregano",
      "Black pepper",
      "Mozzarella cheese",
      "Onion powder",
      "Garlic powder",
      "Cajun seasoning"
    ],

    steps: [
      "Boil pasta with salt and save half a cup of pasta water.",
      "Add 2 tbsp butter to a pan.",
      "Add 2 tbsp flour and whisk together.",
      "Add 1 cup hot milk while whisking.",
      "Add pasta water.",
      "Add spices according to taste.",
      "Cook on medium heat until thick.",
      "Add cooked pasta.",
      "Top with mozzarella cheese."
    ],

    notes: "Serve hot."
  },

  ar: {
    title: "باستا بالبشاميل",
    description: "باستا كريمية مع صوص بشاميل منزلي وجبن موزاريلا.",

    ingredients: [
      "زبدة",
      "طحين متعدد الاستخدامات",
      "حليب",
      "ملح",
      "فلفل أحمر مجروش",
      "أوريغانو",
      "فلفل أسود",
      "جبن موزاريلا",
      "بودرة بصل",
      "بودرة ثوم",
      "بهارات كاجون"
    ],

    steps: [
      "اسلقي الباستا مع الملح واحتفظي بنصف كوب من ماء الباستا.",
      "أضيفي ملعقتين زبدة إلى المقلاة.",
      "أضيفي ملعقتين طحين واخفقيهم.",
      "أضيفي كوب حليب ساخن مع الخفق.",
      "أضيفي ماء الباستا.",
      "أضيفي البهارات حسب الرغبة.",
      "اطبخي على نار متوسطة حتى يثخن الصوص.",
      "أضيفي الباستا المطبوخة.",
      "أضيفي جبن موزاريلا فوقها."
    ],

    notes: "تقدم ساخنة."
  }
  },

  // ──────────────────────────────────────────
  //  ✏️  ADD YOUR NEXT RECIPE BELOW THIS LINE
  // ──────────────────────────────────────────
  {
  id: 2,
  image: "/images/lazy-pizza.jpg",
  category: "Quick Meals",

  en: {
    title: "Pizza for Lazy and Busy People",
    description: "A quick homemade pizza using naan bread, perfect for busy days.",

    ingredients: [
      "Naan or any other bread",
      "Ketchup",
      "Mozzarella cheese",
      "Oregano",
      "Cooked pepperoni or hot dog",
      "Salt",
      "Red chilli flakes"
    ],

    steps: [
      "Spread ketchup on the bread.",
      "Add oregano.",
      "Add mozzarella cheese.",
      "Add cooked pepperoni or hot dog.",
      "Sprinkle salt and red chilli flakes.",
      "Bake until the cheese melts."
    ],

    notes: "Best served hot."
  },

  ar: {
    title: "بيتزا للكسلانين والمشغولين",
    description: "بيتزا سريعة باستخدام خبز النان، مثالية للأيام المزدحمة.",

    ingredients: [
      "خبز نان أو أي نوع خبز",
      "كاتشب",
      "جبن موزاريلا",
      "أوريغانو",
      "بيبروني مطبوخ أو هوت دوغ",
      "ملح",
      "فلفل أحمر مجروش"
    ],

    steps: [
      "افردي الكاتشب على الخبز.",
      "أضيفي الأوريغانو.",
      "أضيفي جبن الموزاريلا.",
      "أضيفي البيبروني أو الهوت دوغ.",
      "رشي الملح والفلفل الأحمر.",
      "اخبزي حتى يذوب الجبن."
    ],

    notes: "يفضل تقديمها ساخنة."
  }
},

  {
  id: 3,
  image: "/images/salad.jpg",
  category: "Salads",

  en: {
    title: "Fresh Salad",
    description: "A fresh salad with roasted chickpeas, feta cheese, walnuts, and homemade dressing.",

    ingredients: [
      "Lettuce",
      "Cherry tomatoes",
      "Walnuts",
      "Feta cheese",
      "Chickpeas",
      "Pickles",
      "Paprika",
      "Salt"
    ],

    steps: [
      "Add paprika and salt to the chickpeas.",
      "Roast the chickpeas in the air fryer or oven until crispy.",
      "Wash and prepare the lettuce.",
      "Cut the cherry tomatoes.",
      "Add walnuts, feta cheese, pickles, and roasted chickpeas.",
      "Prepare the dressing.",
      "Pour the dressing over the salad and mix gently."
    ],

    notes: "Serve immediately for maximum freshness."
  },

  ar: {
    title: "سلطة طازجة",
    description: "سلطة طازجة مع حمص محمص، جبن فيتا، جوز، وصوص منزلي.",

    ingredients: [
      "خس",
      "طماطم كرزية",
      "جوز",
      "جبن فيتا",
      "حمص",
      "مخلل",
      "بابريكا",
      "ملح"
    ],

    steps: [
      "أضيفي البابريكا والملح إلى الحمص.",
      "حمصي الحمص في القلاية الهوائية أو الفرن حتى يصبح مقرمشاً.",
      "اغسلي وجهزي الخس.",
      "قطعي الطماطم الكرزية.",
      "أضيفي الجوز وجبن الفيتا والمخلل والحمص المحمص.",
      "حضري الصوص.",
      "اسكبي الصوص فوق السلطة واخلطي بلطف."
    ],

    notes: "يفضل تقديمها مباشرة."
  },

  sauce: {
    en: [
      "Lemon",
      "Oregano",
      "Salt",
      "Olive oil",
      "Honey",
      "Dijon mustard or regular mustard",
      "Za’atar"
    ],

    ar: [
      "ليمون",
      "أوريغانو",
      "ملح",
      "زيت زيتون",
      "عسل",
      "خردل ديجون أو خردل عادي",
      "زعتر"
    ]
  }
},
{
  id: 4,
  image: "/images/rice-chicken.jpg",
  category: "Main Dish",

  en: {
    title: "Rice with Chicken",
    description: "Fragrant rice served with marinated golden chicken, perfect for lunch or dinner.",

    ingredients: [
      "Chicken thighs or breasts",
      "Yogurt",
      "Tomato paste",
      "Onion powder",
      "Garlic powder",
      "Salt",
      "Hot sauce",
      "Cajun seasoning",
      "Paprika",
      "Vegetable oil",
      "Oil spray",
      "Rice",
      "Turmeric or saffron",
      "Black pepper"
    ],

    steps: [
      "Wash the rice until the water becomes clear.",
      "Add 2 cups of cold water for every 1 cup of rice.",
      "Add turmeric or saffron, salt, and black pepper.",
      "Cook the rice on medium heat.",

      "In a bowl, mix yogurt, tomato paste, onion powder, garlic powder, salt, hot sauce, cajun seasoning, and paprika.",
      "Add the chicken and marinate for a few hours.",

      "Heat a pan with oil or oil spray.",
      "Cook the chicken on low heat until both sides become golden.",
      "Transfer the pan to the oven until the chicken is fully cooked.",

      "Serve the chicken over the rice."
    ],

    notes: "The longer the chicken marinates, the better the flavor."
  },

  ar: {
    title: "رز مع دجاج",
    description: "رز متبل مع دجاج متبل ومطهو حتى يصبح ذهبياً، مناسب للغداء أو العشاء.",

    ingredients: [
      "أفخاذ أو صدور دجاج",
      "زبادي",
      "معجون طماطم",
      "بودرة بصل",
      "بودرة ثوم",
      "ملح",
      "صلصة حارة",
      "بهارات كاجون",
      "بابريكا",
      "زيت نباتي",
      "بخاخ زيت",
      "رز",
      "كركم أو زعفران",
      "فلفل أسود"
    ],

    steps: [
      "اغسلي الرز جيداً حتى يصبح الماء صافياً.",
      "أضيفي كوبين ماء بارد لكل كوب رز.",
      "أضيفي الكركم أو الزعفران والملح والفلفل الأسود.",
      "اطبخي الرز على نار متوسطة.",

      "في وعاء، اخلطي الزبادي ومعجون الطماطم وبودرة البصل وبودرة الثوم والملح والصلصة الحارة وبهارات الكاجون والبابريكا.",
      "أضيفي الدجاج واتركيه يتبل لعدة ساعات.",

      "سخني المقلاة مع الزيت أو بخاخ الزيت.",
      "اطبخي الدجاج على نار هادئة حتى يصبح ذهبياً من الجهتين.",
      "ضعي المقلاة في الفرن حتى ينضج الدجاج بالكامل.",

      "قدمي الدجاج فوق الرز."
    ],

    notes: "كلما زادت مدة التتبيل، أصبح الطعم أفضل."
  }
},
{
  id: 5,
  image: "/images/avocado-egg-toast.jpg",
  category: "Breakfast",

  en: {
    title: "Egg and Avocado on Toast",
    description: "A quick and healthy toast topped with creamy avocado and a perfectly fried egg.",

    ingredients: [
      "Bread",
      "Half avocado",
      "Egg",
      "Salt",
      "Oregano",
      "Red chili flakes",
      "Paprika",
      "Onion powder",
      "Garlic powder"
    ],

    steps: [
      "Toast the bread until golden.",
      "Mash half an avocado and spread it on the toast.",
      "Fry the egg.",
      "Place the egg on top of the avocado toast.",
      "Sprinkle salt, oregano, red chili flakes, paprika, onion powder, and garlic powder on top."
    ],

    notes: "Perfect for breakfast or a quick snack."
  },

  ar: {
    title: "توست بالأفوكادو والبيض",
    description: "وجبة سريعة وصحية مع أفوكادو كريمي وبيض مقلي فوق التوست.",

    ingredients: [
      "خبز",
      "نصف أفوكادو",
      "بيض",
      "ملح",
      "أوريغانو",
      "فلفل أحمر مجروش",
      "بابريكا",
      "بودرة بصل",
      "بودرة ثوم"
    ],

    steps: [
      "حمصي الخبز حتى يصبح ذهبياً.",
      "اهرسي نصف حبة أفوكادو وادهنيها على التوست.",
      "اقلي البيضة.",
      "ضعي البيضة فوق الأفوكادو.",
      "رشي الملح والأوريغانو والفلفل الأحمر والبابريكا وبودرة البصل والثوم."
    ],

    notes: "مثالية للفطور أو كوجبة خفيفة."
  }
},
{
  id: 6,
  image: "/images/sushi-bowl.jpg",
  category: "Seafood",

  en: {
    title: "Sushi Bowl",
    description: "A quick homemade sushi bowl with salmon, rice, avocado, and seaweed.",

    ingredients: [
      "Salmon or canned tuna",
      "Rice",
      "Hot sauce",
      "Soy sauce",
      "Japanese mayo or regular mayo",
      "Avocado",
      "Scallions",
      "Roasted seaweed",
      "Rice vinegar",
      "Onion powder",
      "Garlic powder",
      "Oil spray",
      "Pickled ginger"
    ],

    steps: [
      "Add onion powder, garlic powder, and rice vinegar to the salmon.",
      "Cook the salmon on medium heat in a pan with oil spray.",
      "Cook the rice.",
      "Add rice vinegar to the rice if desired.",
      "Mix the salmon and rice with mayo, hot sauce, and soy sauce.",
      "Add avocado, scallions, and pickled ginger.",
      "Wrap everything in roasted seaweed and enjoy."
    ],

    notes: "Can also be made with canned tuna."
  },

  ar: {
    title: "سوشي باول",
    description: "سوشي منزلي سريع مع السالمون أو التونة، الأرز، الأفوكادو، والأعشاب البحرية.",

    ingredients: [
      "سالمون أو تونة معلبة",
      "رز",
      "صلصة حارة",
      "صويا صوص",
      "مايونيز ياباني أو عادي",
      "أفوكادو",
      "بصل أخضر",
      "أعشاب بحرية محمصة",
      "خل الأرز",
      "بودرة بصل",
      "بودرة ثوم",
      "بخاخ زيت",
      "زنجبيل مخلل"
    ],

    steps: [
      "أضيفي بودرة البصل والثوم وخل الأرز إلى السالمون.",
      "اطبخي السالمون على نار متوسطة في مقلاة مع بخاخ الزيت.",
      "اطبخي الأرز.",
      "أضيفي خل الأرز إلى الأرز إذا رغبتِ.",
      "اخلطي السالمون والأرز مع المايونيز والصلصة الحارة والصويا صوص.",
      "أضيفي الأفوكادو والبصل الأخضر والزنجبيل المخلل.",
      "لفي الخليط بالأعشاب البحرية واستمتعي."
    ],

    notes: "يمكن تحضيرها أيضاً باستخدام التونة المعلبة."
  }
},
{
  id: 7,
  image: "/images/chickpea-crunch-salad.jpg",
  category: "Salads",

  en: {
    title: "Roasted Chickpea Crunch Salad",
    description: "A fresh crunchy salad with roasted chickpeas, nuts, and a creamy tahini dressing.",

    ingredients: [
      "Lettuce",
      "Chickpeas",
      "Carrots",
      "Spring onions",
      "Pickles",
      "Nuts",
      "Paprika",
      "Salt"
    ],

    steps: [
      "Add paprika, salt, and your favorite seasonings to the chickpeas.",
      "Roast the chickpeas in the oven or air fryer until crispy.",
      "Wash and prepare the lettuce.",
      "Slice the carrots, spring onions, and pickles.",
      "Add the nuts and roasted chickpeas.",
      "Prepare the dressing.",
      "Pour the dressing over the salad and mix gently."
    ],

    notes: "Best served fresh while the chickpeas are still crispy."
  },

  ar: {
    title: "سلطة الحمص المقرمش",
    description: "سلطة طازجة ومقرمشة مع حمص محمص، مكسرات، وصوص طحينية كريمي.",

    ingredients: [
      "خس",
      "حمص",
      "جزر",
      "بصل أخضر",
      "مخلل",
      "مكسرات",
      "بابريكا",
      "ملح"
    ],

    steps: [
      "أضيفي البابريكا والملح وأي بهارات تفضلينها إلى الحمص.",
      "حمصي الحمص في الفرن أو القلاية الهوائية حتى يصبح مقرمشاً.",
      "اغسلي وجهزي الخس.",
      "قطعي الجزر والبصل الأخضر والمخلل.",
      "أضيفي المكسرات والحمص المحمص.",
      "حضري الصوص.",
      "اسكبي الصوص فوق السلطة واخلطي بلطف."
    ],

    notes: "يفضل تقديمها مباشرة للحفاظ على قرمشة الحمص."
  },

  sauce: {
    en: [
      "Mayonnaise",
      "Tahini",
      "Lemon or vinegar",
      "Salt",
      "Oregano",
      "Onion powder",
      "Black pepper"
    ],

    ar: [
      "مايونيز",
      "طحينية",
      "ليمون أو خل",
      "ملح",
      "أوريغانو",
      "بودرة بصل",
      "فلفل أسود"
    ]
  }
},
{
  id: 8,
  image: "/images/kimchi-noodle-soup.jpg",
  category: "Soups",

  en: {
    title: "Korean-Style Kimchi Noodle Soup",
    description: "A warm, comforting noodle soup with mushrooms, vegetables, and a spicy Korean-inspired broth.",

    ingredients: [
      "Any type of noodles",
      "Carrot",
      "Spring onion",
      "Mushrooms",
      "Enoki mushrooms",
      "Bean sprouts",
      "Garlic powder",
      "Onion powder",
      "Salt",
      "Chicken or vegetable broth cubes",
      "Sesame oil",
      "Soy sauce",
      "Gochujang",
      "Minced garlic",
      "Kimchi"
    ],

    steps: [
      "Boil the noodles until cooked.",
      "Drain the hot water and rinse the noodles with cold water.",

      "Add grated carrots, mushrooms, minced garlic, and spring onion to a pan.",
      "Add one teaspoon sesame oil and cooking spray.",
      "Cook on medium heat.",

      "Add soy sauce, broth cubes, garlic powder, onion powder, and a small amount of gochujang.",
      "Add hot water and let it boil.",

      "Add enoki mushrooms and bean sprouts.",
      "Cook on medium heat for a few minutes.",

      "Add salt according to taste.",
      "Place noodles in a bowl.",
      "Pour the hot soup over the noodles.",

      "Serve with kimchi on the side."
    ],

    notes: "You can add beef, chicken, or shrimp for extra protein."
  },

  ar: {
    title: "شوربة نودلز بالكيمتشي على الطريقة الكورية",
    description: "شوربة نودلز دافئة مع الفطر والخضار ومرق مستوحى من المطبخ الكوري.",

    ingredients: [
      "أي نوع نودلز",
      "جزر",
      "بصل أخضر",
      "فطر",
      "فطر إينوكي",
      "براعم الفاصوليا",
      "بودرة ثوم",
      "بودرة بصل",
      "ملح",
      "مكعبات مرق دجاج أو خضار",
      "زيت السمسم",
      "صويا صوص",
      "غوتشوجانغ",
      "ثوم مفروم",
      "كيمتشي"
    ],

    steps: [
      "اسلقي النودلز حتى تنضج.",
      "صفي الماء الساخن واغسليها بالماء البارد.",

      "أضيفي الجزر المبشور والفطر والثوم المفروم والبصل الأخضر إلى المقلاة.",
      "أضيفي ملعقة صغيرة من زيت السمسم مع بخاخ الزيت.",
      "اطبخي على نار متوسطة.",

      "أضيفي الصويا صوص ومكعبات المرق وبودرة الثوم والبصل وكمية صغيرة من الغوتشوجانغ.",
      "أضيفي ماء ساخن واتركيه يغلي.",

      "أضيفي فطر الإينوكي وبراعم الفاصوليا.",
      "اتركيه على نار متوسطة لبضع دقائق.",

      "أضيفي الملح حسب الرغبة.",
      "ضعي النودلز في وعاء.",
      "اسكبي الشوربة الساخنة فوقها.",

      "قدميها مع الكيمتشي على الجانب."
    ],

    notes: "يمكن إضافة لحم أو دجاج أو روبيان للحصول على طعم أفضل."
  }
},
{
  id: 9,
  image: "/images/chicken-rice-bowl.jpg",
  category: "Healthy Bowls",

  en: {
    title: "Chicken Rice Power Bowl",
    description: "A balanced bowl with seasoned chicken, fluffy rice, fresh vegetables, and a creamy spicy sauce.",

    ingredients: [
      "Chicken breast",
      "Yogurt",
      "Oregano",
      "Paprika",
      "Onion powder",
      "Garlic powder",
      "Vinegar",
      "Chili flakes",
      "Rice",
      "Rosemary",
      "Salt",
      "Avocado",
      "Lettuce",
      "Carrots",
      "Edamame beans",
      "Arugula",
      "Mushrooms",
      "Oil or butter"
    ],

    steps: [
      "Cut the chicken breast into cubes.",
      "Marinate the chicken with yogurt, oregano, paprika, onion powder, garlic powder, vinegar, and chili flakes.",
      "Cook the chicken in the air fryer, oven, or a pan until fully cooked.",

      "Wash the rice well.",
      "Add 2 cups of cold water for every 1 cup of rice.",
      "Add rosemary and salt.",
      "Cook on medium heat until fluffy.",

      "Cook the mushrooms in a pan with oil or butter until caramelized.",
      "Add salt and your preferred spices.",

      "Add cooked rice to the bowl.",
      "Top with chicken, avocado, lettuce, carrots, edamame, arugula, and mushrooms.",

      "Prepare the sauce and drizzle on top."
    ],

    notes: "Can also be meal-prepped for busy days."
  },

  ar: {
    title: "باور باول بالدجاج والرز",
    description: "وعاء متوازن مع دجاج متبل، رز هش، خضار طازجة، وصوص كريمي حار.",

    ingredients: [
      "صدر دجاج",
      "زبادي",
      "أوريغانو",
      "بابريكا",
      "بودرة بصل",
      "بودرة ثوم",
      "خل",
      "فلفل مجروش",
      "رز",
      "إكليل الجبل",
      "ملح",
      "أفوكادو",
      "خس",
      "جزر",
      "حبوب إيدامامي",
      "جرجير",
      "فطر",
      "زيت أو زبدة"
    ],

    steps: [
      "قطعي صدر الدجاج إلى مكعبات.",
      "تبلي الدجاج بالزبادي والأوريغانو والبابريكا وبودرة البصل والثوم والخل والفلفل المجروش.",
      "اطبخي الدجاج في القلاية الهوائية أو الفرن أو المقلاة حتى ينضج.",

      "اغسلي الرز جيداً.",
      "أضيفي كوبين ماء بارد لكل كوب رز.",
      "أضيفي إكليل الجبل والملح.",
      "اطبخي على نار متوسطة حتى ينضج.",

      "اطبخي الفطر في مقلاة مع الزيت أو الزبدة حتى يتكرمل.",
      "أضيفي الملح والبهارات المفضلة.",

      "ضعي الرز في الوعاء.",
      "أضيفي الدجاج والأفوكادو والخس والجزر والإيدامامي والجرجير والفطر.",

      "حضري الصوص واسكبيه فوق الوعاء."
    ],

    notes: "مناسبة أيضاً لتحضير الوجبات المسبقة."
  },

  sauce: {
    en: [
      "Yogurt",
      "Sriracha",
      "Salt",
      "Onion powder",
      "Italian seasonings"
    ],

    ar: [
      "زبادي",
      "سريراتشا",
      "ملح",
      "بودرة بصل",
      "بهارات إيطالية"
    ]
  }
},
{
  id: 10,
  image: "/images/overnight-oats.jpg",
  category: "Breakfast",

  en: {
    title: "Banana Cinnamon Overnight Oats",
    description: "A creamy overnight oatmeal recipe with banana, cinnamon, and your favorite toppings.",

    ingredients: [
      "Oats",
      "Any type of milk",
      "Any sweetener",
      "Cinnamon",
      "Banana",
      "Dark chocolate (optional)",
      "Nuts or fruits (optional)"
    ],

    steps: [
      "Mash a ripe banana in a bowl.",
      "Add oats.",
      "Add cold milk.",
      "Add cinnamon and your preferred sweetener.",
      "Mix everything well.",
      "Cover and leave it overnight in the fridge.",
      "Add toppings just before eating."
    ],

    notes: "Coconut milk and maple syrup give it extra flavor."
  },

  ar: {
    title: "شوفان ليلي بالموز والقرفة",
    description: "وصفة شوفان كريمية تُحضّر من الليلة السابقة مع الموز والقرفة وإضافات حسب الرغبة.",

    ingredients: [
      "شوفان",
      "أي نوع حليب",
      "أي محلي",
      "قرفة",
      "موز",
      "شوكولاتة داكنة (اختياري)",
      "مكسرات أو فواكه (اختياري)"
    ],

    steps: [
      "اهرسي موزة ناضجة في وعاء.",
      "أضيفي الشوفان.",
      "أضيفي الحليب البارد.",
      "أضيفي القرفة والمحلي المفضل.",
      "اخلطي جميع المكونات جيداً.",
      "غطي الوعاء واتركيه طوال الليل في الثلاجة.",
      "أضيفي التوبينغ قبل الأكل مباشرة."
    ],

    notes: "حليب جوز الهند وشراب القيقب يعطيان نكهة مميزة."
  }
},
{
  id: 11,
  image: "/images/spicy-tuna-sushi-rolls.jpg",
  category: "Seafood",

  en: {
    title: "Spicy Tuna Sushi Rolls",
    description: "Homemade sushi rolls with creamy spicy tuna, avocado, cucumber, and nori seaweed.",

    ingredients: [
      "Sushi rice or medium-grain rice",
      "Canned tuna",
      "Nori seaweed",
      "Cucumber",
      "Avocado",
      "Korean yellow pickled radish",
      "Japanese mayo or regular mayo",
      "Sesame oil",
      "Sriracha",
      "Soy sauce",
      "Salt",
      "Spring onions",
      "Rice vinegar",
      "Chili flakes",
      "Onion powder",
      "Garlic powder"
    ],

    steps: [
      "Drain the canned tuna well.",

      "Mix the tuna with sriracha, mayo, soy sauce, salt, rice vinegar, and chopped spring onions.",
      "Optionally add sesame oil, garlic powder, onion powder, and chili flakes.",

      "Wash the rice until the water becomes clear.",
      "Add 2 cups of cold water for every 1 cup of rice.",
      "Cook on medium heat until done.",

      "Let the rice cool.",
      "Add rice vinegar and sesame oil if desired.",

      "Cut the avocado and cucumber into long slices.",

      "Place rice on the nori sheet.",
      "Add tuna mixture, avocado, cucumber, and pickled radish.",

      "Roll tightly and slice.",
      "Serve and enjoy."
    ],

    notes: "Crab sticks can also be used instead of tuna."
  },

  ar: {
    title: "رولات سوشي بالتونة الحارة",
    description: "رولات سوشي منزلية مع تونة كريمية حارة، أفوكادو، خيار، وأعشاب بحرية.",

    ingredients: [
      "رز سوشي أو رز متوسط الحبة",
      "تونة معلبة",
      "أعشاب بحرية نوري",
      "خيار",
      "أفوكادو",
      "فجل أصفر كوري مخلل",
      "مايونيز ياباني أو عادي",
      "زيت السمسم",
      "سريراتشا",
      "صويا صوص",
      "ملح",
      "بصل أخضر",
      "خل الأرز",
      "فلفل مجروش",
      "بودرة بصل",
      "بودرة ثوم"
    ],

    steps: [
      "صفي التونة جيداً.",

      "اخلطي التونة مع السريراتشا والمايونيز والصويا صوص والملح وخل الأرز والبصل الأخضر.",
      "يمكن إضافة زيت السمسم وبودرة الثوم والبصل والفلفل المجروش.",

      "اغسلي الرز حتى يصبح الماء صافياً.",
      "أضيفي كوبين ماء بارد لكل كوب رز.",
      "اطبخي على نار متوسطة حتى ينضج.",

      "اتركي الرز يبرد.",
      "أضيفي خل الأرز وزيت السمسم إذا رغبتِ.",

      "قطعي الأفوكادو والخيار إلى شرائح طويلة.",

      "ضعي الرز فوق ورقة النوري.",
      "أضيفي خليط التونة والأفوكادو والخيار والفجل المخلل.",

      "لفي الرول بإحكام ثم قطعيه.",
      "قدميه واستمتعي."
    ],

    notes: "يمكن استخدام أصابع السلطعون بدلاً من التونة."
  }
},
{
  id: 12,
  image: "/images/buffalo-chicken-salad.jpg",
  category: "Salads",

  en: {
    title: "Crispy Buffalo Chicken Salad",
    description: "A fresh crunchy salad topped with crispy buffalo chicken and a creamy yogurt dressing.",

    ingredients: [
      "Lettuce",
      "Chicken popcorn",
      "Cabbage",
      "Spring onions",
      "Greek yogurt",
      "Lemon",
      "Oregano",
      "Garlic powder",
      "Salt",
      "Hot sauce or buffalo sauce",
      "Cooking spray or butter"
    ],

    steps: [
      "Cut the lettuce, cabbage, and spring onions.",
      "Add the vegetables to a bowl.",

      "Cook the chicken popcorn in the air fryer or fry them until crispy.",

      "Add hot sauce to a pan with cooking spray or butter.",
      "Cook on medium heat.",

      "Add the cooked chicken popcorn to the sauce.",
      "Mix until coated.",

      "Prepare the dressing.",
      "Add the buffalo chicken on top of the salad.",

      "Drizzle the sauce and serve."
    ],

    notes: "Ranch dressing also works very well."
  },

  ar: {
    title: "سلطة دجاج بافلو مقرمشة",
    description: "سلطة طازجة ومقرمشة مع دجاج بافلو وصوص زبادي كريمي.",

    ingredients: [
      "خس",
      "دجاج بوبكورن",
      "ملفوف",
      "بصل أخضر",
      "زبادي يوناني",
      "ليمون",
      "أوريغانو",
      "بودرة ثوم",
      "ملح",
      "صلصة حارة أو بافلو",
      "بخاخ زيت أو زبدة"
    ],

    steps: [
      "قطعي الخس والملفوف والبصل الأخضر.",
      "ضعي الخضار في وعاء.",

      "اطبخي دجاج البوبكورن في القلاية الهوائية أو اقليه حتى يصبح مقرمشاً.",

      "أضيفي الصلصة الحارة إلى المقلاة مع بخاخ الزيت أو الزبدة.",
      "اطبخي على نار متوسطة.",

      "أضيفي الدجاج المطبوخ إلى الصوص.",
      "اخلطي حتى يتغطى بالكامل.",

      "حضري الصوص.",
      "أضيفي الدجاج فوق السلطة.",

      "اسكبي الصوص وقدميها."
    ],

    notes: "يمكن أيضاً استخدام صوص الرانش."
  },

  sauce: {
    en: [
      "Greek yogurt",
      "Lemon juice",
      "Oregano",
      "Salt",
      "Garlic powder"
    ],

    ar: [
      "زبادي يوناني",
      "عصير ليمون",
      "أوريغانو",
      "ملح",
      "بودرة ثوم"
    ]
  }
},
{
  id: 13,
  image: "/images/creamy-peanut-noodles.jpg",
  category: "Quick Meals",

  en: {
    title: "Creamy Peanut Noodles",
    description: "Quick noodles tossed in a creamy peanut sauce with fresh cucumber and spring onions.",

    ingredients: [
      "Any type of noodles",
      "Peanut butter",
      "Miso paste",
      "Rice vinegar",
      "Soy sauce",
      "Maple syrup or sweetener",
      "Minced garlic",
      "Minced ginger",
      "Spring onions",
      "Sesame oil",
      "Sesame seeds",
      "Cucumber",
      "Chili flakes"
    ],

    steps: [
      "Boil the noodles until cooked.",
      "Save some noodle water for later.",
      "Drain and rinse the noodles with cold water.",

      "In a bowl, add miso paste, peanut butter, maple syrup, soy sauce, rice vinegar, and sesame oil.",
      "Add hot noodle water gradually until you get the consistency you like.",
      "Mix well until smooth.",

      "Add minced garlic, minced ginger, and chili flakes if desired.",

      "Add the noodles into the sauce.",
      "Mix until fully coated.",

      "Top with cucumber, spring onions, and sesame seeds.",
      "Serve and enjoy."
    ],

    notes: "Perfect served cold or slightly warm."
  },

  ar: {
    title: "نودلز بصوص الفول السوداني الكريمي",
    description: "نودلز سريعة مع صوص فول سوداني كريمي وخضار طازجة.",

    ingredients: [
      "أي نوع نودلز",
      "زبدة فول سوداني",
      "معجون ميسو",
      "خل الأرز",
      "صويا صوص",
      "شراب القيقب أو أي محلي",
      "ثوم مفروم",
      "زنجبيل مفروم",
      "بصل أخضر",
      "زيت السمسم",
      "سمسم",
      "خيار",
      "فلفل مجروش"
    ],

    steps: [
      "اسلقي النودلز حتى تنضج.",
      "احتفظي ببعض ماء النودلز.",
      "صفي النودلز واغسليها بالماء البارد.",

      "في وعاء، أضيفي معجون الميسو وزبدة الفول السوداني وشراب القيقب والصويا صوص وخل الأرز وزيت السمسم.",
      "أضيفي ماء النودلز الساخن تدريجياً حتى تحصلي على القوام المناسب.",
      "اخلطي جيداً حتى يصبح الصوص ناعماً.",

      "أضيفي الثوم والزنجبيل والفلفل المجروش إذا رغبتِ.",

      "أضيفي النودلز إلى الصوص.",
      "اخلطي حتى تتغطى بالكامل.",

      "زيني بالخيار والبصل الأخضر والسمسم.",
      "قدميها واستمتعي."
    ],

    notes: "لذيذة باردة أو دافئة قليلاً."
  }
},
{
  id: 14,
  image: "/images/fish-rice-bowl.jpg",
  category: "Seafood",

  en: {
    title: "Golden Fish Rice Bowl with Creamy Hummus",
    description: "Crispy seasoned fish served with aromatic basmati rice and homemade creamy hummus.",

    ingredients: [
      "Skinless fish fillets",
      "Corn starch",
      "Lemon",
      "Fish spices",
      "Salt",
      "Black pepper",
      "Garlic powder",
      "Onion powder",

      "Basmati rice",
      "Turmeric powder",
      "Saffron",
      "Onion",
      "Garlic",
      "Oil",
      "Bay leaf",

      "Cooked chickpeas",
      "Tahini",
      "Yogurt",
      "Ice cubes"
    ],

    steps: [
      "Dice the onion and mince the garlic.",
      "Cook them in a pan with oil until golden.",

      "Add the rice and spices.",
      "Add 2 cups of water for every 1 cup of rice.",
      "Cook on medium heat until fluffy.",

      "Marinate the fish fillets with lemon, salt, fish spices, black pepper, garlic powder, and onion powder.",
      "Leave them to marinate for some time.",

      "Mix corn starch with the same spices.",
      "Coat the fish fillets with the mixture.",

      "Heat oil in a pan.",
      "Pan fry the fish until golden and crispy.",
      "You can also deep fry for extra crispiness.",

      "For the hummus, add chickpeas, tahini, lemon juice, yogurt, ice cubes, salt, and garlic powder to a blender.",
      "Blend until smooth.",
      "Adjust the consistency to your preference.",

      "Serve the fish with rice and hummus."
    ],

    notes: "Deep frying gives the fish extra crunch."
  },

  ar: {
    title: "باول رز بالسمك الذهبي مع حمص كريمي",
    description: "سمك مقرمش متبل يقدم مع رز بسمتي معطر وحمص منزلي كريمي.",

    ingredients: [
      "فيليه سمك بدون جلد",
      "نشا الذرة",
      "ليمون",
      "بهارات سمك",
      "ملح",
      "فلفل أسود",
      "بودرة ثوم",
      "بودرة بصل",

      "رز بسمتي",
      "كركم",
      "زعفران",
      "بصل",
      "ثوم",
      "زيت",
      "ورق غار",

      "حمص مطبوخ",
      "طحينية",
      "زبادي",
      "مكعبات ثلج"
    ],

    steps: [
      "قطعي البصل وافرمي الثوم.",
      "اطبخيهم في مقلاة مع الزيت حتى يصبح اللون ذهبياً.",

      "أضيفي الرز والبهارات.",
      "أضيفي كوبين ماء لكل كوب رز.",
      "اطبخي على نار متوسطة حتى ينضج.",

      "تبلي السمك بالليمون والملح وبهارات السمك والفلفل الأسود وبودرة الثوم والبصل.",
      "اتركيه يتبل لبعض الوقت.",

      "اخلطي نشا الذرة مع نفس البهارات.",
      "غطي السمك بالخليط.",

      "سخني الزيت في المقلاة.",
      "اقلي السمك حتى يصبح ذهبياً ومقرمشاً.",
      "يمكن قليه غمراً للحصول على قرمشة أكثر.",

      "للحمص، أضيفي الحمص والطحينية وعصير الليمون والزبادي ومكعبات الثلج والملح وبودرة الثوم إلى الخلاط.",
      "اخلطي حتى يصبح القوام ناعماً.",
      "عدلي القوام حسب رغبتك.",

      "قدمي السمك مع الرز والحمص."
    ],

    notes: "القلي الغزير يعطي قرمشة أقوى."
  }
},
{
  id: 15,
  image: "/images/shish-barak.jpg",
  category: "Middle Eastern",

  en: {
    title: "Shish Barak with Rice",
    description: "Golden beef dumplings cooked in a warm yogurt sauce and served with rice and toasted almonds.",

    ingredients: [
      "Ground beef",
      "Cinnamon",
      "Meat spices",
      "Black pepper",
      "Salt",
      "7 spices",
      "All-purpose flour",
      "Water",
      "Yogurt",
      "Corn starch",
      "Coriander",
      "Garlic",
      "Almonds",
      "Butter, vegetable oil, or cooking spray",
      "Rice",
      "Vermicelli"
    ],

    steps: [
      "Cook 450 g ground beef in a hot pan with salt, black pepper, cinnamon, 7 spices, and meat spices.",
      "For the dough, mix 1.5 cups all-purpose flour with 2 tbsp yogurt and a pinch of salt.",
      "Add warm water gradually while mixing until a non-sticky dough forms.",
      "Let the dough rest for 30 minutes.",
      "Roll the dough into a thin sheet.",
      "Cut the dough into equal circles using a cookie cutter, small cup, or bowl.",
      "Add cooked meat filling into each circle.",
      "Shape each piece like a dumpling.",
      "Cook the dumplings in the air fryer or oven with cooking spray or oil until golden.",
      "Mix 750 g plain yogurt with salt, 2 tbsp corn starch, and 3/4 cup water.",
      "Cook the yogurt mixture on medium heat while stirring gently until it boils.",
      "Add the cooked dumplings to the yogurt sauce.",
      "Let them cook in the yogurt for 10 minutes.",
      "In another pan, melt butter or heat oil.",
      "Add 5 garlic cloves and chopped coriander.",
      "Cook on low heat until fragrant.",
      "Add the garlic and coriander mix to the yogurt and dumplings.",
      "Toast the almonds in a hot pan with oil until golden.",
      "Cook the rice with vermicelli.",
      "Serve the shish barak with rice and top with almonds."
    ],

    notes: "Keep stirring the yogurt gently so it stays smooth."
  },

  ar: {
    title: "شيش برك مع الرز",
    description: "قطع عجين محشوة باللحم ومطبوخة بصلصة لبن دافئة، تقدم مع الرز واللوز المحمص.",

    ingredients: [
      "لحم مفروم",
      "قرفة",
      "بهارات لحم",
      "فلفل أسود",
      "ملح",
      "سبع بهارات",
      "طحين متعدد الاستخدامات",
      "ماء",
      "زبادي",
      "نشا الذرة",
      "كزبرة",
      "ثوم",
      "لوز",
      "زبدة أو زيت نباتي أو بخاخ زيت",
      "رز",
      "شعيرية"
    ],

    steps: [
      "اطبخي 450 غرام لحم مفروم في مقلاة ساخنة مع الملح والفلفل الأسود والقرفة والسبع بهارات وبهارات اللحم.",
      "لتحضير العجينة، اخلطي كوب ونصف طحين مع ملعقتين زبادي ورشة ملح.",
      "أضيفي الماء الدافئ تدريجياً مع الخلط حتى تتكون عجينة غير لاصقة.",
      "اتركي العجينة ترتاح لمدة نصف ساعة.",
      "افردي العجينة حتى تصبح رقيقة.",
      "قطعي العجينة إلى دوائر متساوية باستخدام قطاعة أو كوب صغير.",
      "ضعي حشوة اللحم داخل كل دائرة.",
      "شكلي كل قطعة مثل الدمبلنغ.",
      "اطبخي القطع في القلاية الهوائية أو الفرن مع بخاخ زيت أو قليل من الزيت حتى تصبح ذهبية.",
      "اخلطي 750 غرام زبادي مع الملح وملعقتين نشا وثلاثة أرباع كوب ماء.",
      "ضعي خليط اللبن على نار متوسطة مع التحريك بلطف حتى يغلي.",
      "أضيفي قطع الشيش برك المطبوخة إلى اللبن.",
      "اتركيها داخل اللبن لمدة 10 دقائق.",
      "في مقلاة أخرى، أذيبي الزبدة أو سخني الزيت.",
      "أضيفي 5 فصوص ثوم مع الكزبرة المفرومة.",
      "اطبخي على نار هادئة حتى تظهر الرائحة.",
      "أضيفي خليط الثوم والكزبرة إلى اللبن والشيش برك.",
      "حمصي اللوز في مقلاة ساخنة مع قليل من الزيت حتى يصبح ذهبياً.",
      "اطبخي الرز مع الشعيرية.",
      "قدمي الشيش برك مع الرز وأضيفي اللوز فوقه."
    ],

    notes: "حركي اللبن بلطف حتى يبقى ناعماً ولا يتكتل."
  }
},
{
  id: 16,
  image: "/images/thai-mango-sticky-rice.jpg",
  category: "Desserts",

  en: {
    title: "Easy Thai Mango Sticky Rice",
    description: "A creamy coconut sticky rice dessert served with sweet mango and toasted sesame seeds.",

    ingredients: [
      "Sticky rice or short grain rice",
      "Coconut milk",
      "Water",
      "Corn starch or rice flour",
      "Sugar",
      "Salt",
      "Sweet mango",
      "Black sesame seeds",
      "White sesame seeds"
    ],

    steps: [
      "Wash the rice well until the water becomes clear.",
      "Soak the rice in water for 30 minutes.",
      "Drain the water.",

      "Add the rice to a non-stick deep pan.",
      "Add 1.5 cups coconut milk.",
      "Add 0.5 cup room temperature water.",
      "Add 2.5 tablespoons sugar and a pinch of salt.",

      "Cook on medium heat while stirring gently.",
      "Once it starts boiling, let it simmer for a few minutes.",
      "Stir again until the rice is almost cooked.",

      "Cover the pan.",
      "Cook on low heat until all the liquid is absorbed.",

      "For the coconut sauce, add 0.5 cup coconut milk to a pan.",
      "Add 2.5 tablespoons sugar, a pinch of salt, and 1 tablespoon corn starch.",
      "Whisk until smooth.",

      "Cook on medium heat until the sauce thickens.",
      "Stir gently to prevent sticking.",

      "Let the rice and sauce cool slightly.",
      "Add the sauce over the rice.",
      "Add mango slices on top.",
      "Garnish with black and white sesame seeds."
    ],

    notes: "This is an easier homemade version, not the traditional method."
  },

  ar: {
    title: "مانجو ستكي رايس التايلندي السهل",
    description: "حلى أرز كريمي بحليب جوز الهند يقدم مع المانجو الحلوة والسمسم المحمص.",

    ingredients: [
      "رز لزج أو رز قصير الحبة",
      "حليب جوز الهند",
      "ماء",
      "نشا الذرة أو طحين الأرز",
      "سكر",
      "ملح",
      "مانجو حلوة",
      "سمسم أسود",
      "سمسم أبيض"
    ],

    steps: [
      "اغسلي الرز جيداً حتى يصبح الماء صافياً.",
      "انقعي الرز لمدة 30 دقيقة.",
      "صفي الماء.",

      "ضعي الرز في قدر غير لاصق.",
      "أضيفي كوب ونصف من حليب جوز الهند.",
      "أضيفي نصف كوب ماء بدرجة حرارة الغرفة.",
      "أضيفي ملعقتين ونصف سكر ورشة ملح.",

      "اطبخي على نار متوسطة مع التحريك بلطف.",
      "عندما يبدأ بالغليان، اتركيه يغلي بهدوء لبضع دقائق.",
      "حركيه مرة أخرى حتى يقترب من النضج.",

      "غطي القدر.",
      "اطبخي على نار هادئة حتى يجف السائل بالكامل.",

      "لتحضير صوص جوز الهند، أضيفي نصف كوب حليب جوز الهند إلى قدر.",
      "أضيفي السكر والملح وملعقة نشا.",
      "اخفقي حتى يصبح القوام ناعماً.",

      "اطبخي على نار متوسطة حتى يثخن الصوص.",
      "حركي بلطف حتى لا يلتصق.",

      "اتركي الرز والصوص ليبردا قليلاً.",
      "اسكبي الصوص فوق الرز.",
      "أضيفي شرائح المانجو.",
      "زيني بالسمسم الأسود والأبيض."
    ],

    notes: "هذه نسخة منزلية سهلة وليست الطريقة التقليدية الأصلية."
  }
},
{
  id: 17,
  image: "/images/dubai-knafeh-chocolate-bar.jpg",
  category: "Desserts",

  en: {
    title: "Dubai Knafeh Chocolate Bar",
    description: "A crunchy chocolate bar filled with creamy pistachio knafeh filling inspired by the viral Dubai dessert.",

    ingredients: [
      "Milk chocolate or dark chocolate",
      "Knafeh pastry (kataifi dough)",
      "Unsalted butter",
      "Pistachio cream",
      "Tahini",
      "Crushed pistachios",
      "White chocolate (optional for decoration)"
    ],

    steps: [
      "Break the knafeh pastry into small pieces.",
      "Melt butter in a pan.",
      "Add the knafeh pastry and toast until golden and crispy.",

      "In a bowl, mix pistachio cream with tahini.",
      "Add the toasted knafeh and mix well.",

      "Melt the chocolate using a double boiler or microwave.",

      "Pour a thin layer of melted chocolate into a chocolate mold.",
      "Place it in the fridge for a few minutes until slightly firm.",

      "Add the pistachio knafeh filling.",
      "Cover with another layer of melted chocolate.",

      "Decorate with crushed pistachios or white chocolate if desired.",

      "Chill until fully set.",
      "Remove from the mold and enjoy."
    ],

    notes: "Keep refrigerated for the best texture."
  },

  ar: {
    title: "لوح شوكولاتة الكنافة دبي",
    description: "لوح شوكولاتة مقرمش بحشوة كريمية من الفستق والكنافة مستوحى من الحلى الترند في دبي.",

    ingredients: [
      "شوكولاتة حليب أو داكنة",
      "عجينة كنافة",
      "زبدة غير مملحة",
      "كريمة فستق",
      "طحينية",
      "فستق مجروش",
      "شوكولاتة بيضاء (اختياري للتزيين)"
    ],

    steps: [
      "قطعي الكنافة إلى قطع صغيرة.",
      "أذيبي الزبدة في مقلاة.",
      "أضيفي الكنافة وحمريها حتى تصبح ذهبية ومقرمشة.",

      "في وعاء، اخلطي كريمة الفستق مع الطحينية.",
      "أضيفي الكنافة المحمصة واخلطي جيداً.",

      "أذيبي الشوكولاتة باستخدام حمام مائي أو المايكرويف.",

      "اسكبي طبقة رقيقة من الشوكولاتة في قالب الشوكولاتة.",
      "ضعيها في الثلاجة لبضع دقائق حتى تتماسك قليلاً.",

      "أضيفي حشوة الفستق والكنافة.",
      "غطيها بطبقة أخرى من الشوكولاتة.",

      "زيني بالفستق المجروش أو الشوكولاتة البيضاء إذا رغبتِ.",

      "ضعيها في الثلاجة حتى تتماسك بالكامل.",
      "أخرجيها من القالب وقدميها."
    ],

    notes: "يفضل حفظها في الثلاجة."
  }
},
{
  id: 18,
  image: "/images/spicy-honey-chicken-wings.jpg",
  category: "Appetizers",

  en: {
    title: "Korean-Style Spicy Honey Chicken Wings",
    description: "Crispy air-fried chicken wings coated in a sweet, spicy, and garlicky glaze.",

    ingredients: [
      "8 chicken wings",
      "1 egg",
      "2 tablespoons milk or buttermilk",
      "3 tablespoons corn starch",
      "2 tablespoons flour",
      "Hot sauce",
      "Gochujang",
      "Honey",
      "Garlic cloves",
      "Lemon",
      "Ginger paste",
      "Salt",
      "Black pepper",
      "Gochugaru or chili flakes",
      "Garlic powder",
      "Onion powder",
      "Paprika",
      "Cajun seasoning",
      "Chicken seasoning",
      "Ranch or dipping sauce"
    ],

    steps: [
      "Add the chicken wings to a bowl.",
      "Add garlic, ginger paste, salt, pepper, cajun seasoning, paprika, chicken seasoning, garlic powder, and onion powder.",
      "Add lemon juice and mix well.",
      "Marinate for at least 1 hour.",

      "In another bowl, mix flour, corn starch, salt, and the same seasonings.",

      "In a separate bowl, whisk the egg with milk.",

      "Dip each wing into the egg mixture.",
      "Coat each wing in the flour mixture.",

      "Place the coated wings in the freezer for at least 30 minutes.",

      "Cook in the air fryer with oil or cooking spray at 390°F until golden and crispy.",

      "For the sauce, add hot sauce, honey, gochujang, chili flakes, and onion powder to a pan.",
      "Cook on low heat.",

      "Add the cooked wings to the sauce.",
      "Mix until coated and the sauce thickens.",

      "Serve with ranch or your favorite dipping sauce."
    ],

    notes: "Freezing before cooking helps create an extra crispy coating."
  },

  ar: {
    title: "أجنحة دجاج حارة بالعسل على الطريقة الكورية",
    description: "أجنحة دجاج مقرمشة بالقلاية الهوائية مع صوص حار وحلو بنكهة الثوم.",

    ingredients: [
      "8 أجنحة دجاج",
      "بيضة",
      "ملعقتان حليب أو لبن",
      "3 ملاعق نشا ذرة",
      "ملعقتان طحين",
      "صلصة حارة",
      "غوتشوجانغ",
      "عسل",
      "فصوص ثوم",
      "ليمون",
      "معجون زنجبيل",
      "ملح",
      "فلفل أسود",
      "غوتشوغارو أو فلفل مجروش",
      "بودرة ثوم",
      "بودرة بصل",
      "بابريكا",
      "بهارات كاجون",
      "بهارات دجاج",
      "رانش أو أي صوص للتقديم"
    ],

    steps: [
      "ضعي أجنحة الدجاج في وعاء.",
      "أضيفي الثوم والزنجبيل والملح والفلفل وبهارات الكاجون والبابريكا وبهارات الدجاج وبودرة الثوم والبصل.",
      "أضيفي عصير الليمون واخلطي جيداً.",
      "اتركيها تتبل لمدة ساعة على الأقل.",

      "في وعاء آخر، اخلطي الطحين ونشا الذرة والملح ونفس البهارات.",

      "في وعاء منفصل، اخفقي البيض مع الحليب.",

      "اغمسي كل جناح في خليط البيض.",
      "غطيه بخليط الطحين.",

      "ضعي الأجنحة في الفريزر لمدة 30 دقيقة على الأقل.",

      "اطبخيها في القلاية الهوائية مع الزيت أو بخاخ الزيت على حرارة 390 فهرنهايت حتى تصبح ذهبية.",

      "للصوص، أضيفي الصلصة الحارة والعسل والغوتشوجانغ والفلفل المجروش وبودرة البصل إلى مقلاة.",
      "اطبخي على نار هادئة.",

      "أضيفي الأجنحة المطبوخة إلى الصوص.",
      "اخلطي حتى تتغطى بالكامل ويثخن الصوص.",

      "قدميها مع الرانش أو الصوص المفضل."
    ],

    notes: "وضع الأجنحة في الفريزر قبل الطبخ يعطي قرمشة أفضل."
  }
},
{
  id: 19,
  image: "/images/vietnamese-spring-rolls.jpg",
  category: "Appetizers",

  en: {
    title: "Fresh Vietnamese Spring Rolls with Peanut Sauce",
    description: "Fresh rice paper rolls filled with shrimp, herbs, vegetables, and served with a creamy peanut dipping sauce.",

    ingredients: [
      "Rice paper",
      "Cucumber",
      "Shrimp or tofu",
      "Lettuce",
      "Carrot",
      "Basil",
      "Mint",
      "Avocado",
      "Spring onions",
      "Onion powder",
      "Vinegar",
      "Salt",
      "Black seeds or toasted sesame seeds"
    ],

    steps: [
      "Boil the shrimp without the shell in water with vinegar and salt.",
      "Once cooked, season with black pepper and salt.",

      "Slice all vegetables into thin strips.",
      "Separate the lettuce into small leaves.",

      "Quickly rinse one rice paper sheet under cold water for a few seconds.",
      "Place it on a non-stick plate.",

      "Place three shrimp in the center.",
      "Add avocado, cucumber, carrot, herbs, spring onions, and lettuce.",

      "Fold the bottom over the filling.",
      "Fold both sides inward.",
      "Roll tightly from bottom to top.",

      "Sprinkle black seeds or toasted sesame seeds on top."
    ],

    notes: "Tofu works perfectly for a vegetarian version."
  },

  ar: {
    title: "سبرنغ رولز فيتنامية طازجة مع صوص الفول السوداني",
    description: "رولات ورق أرز طازجة محشوة بالروبيان والخضار والأعشاب مع صوص فول سوداني كريمي.",

    ingredients: [
      "ورق أرز",
      "خيار",
      "روبيان أو توفو",
      "خس",
      "جزر",
      "ريحان",
      "نعناع",
      "أفوكادو",
      "بصل أخضر",
      "بودرة بصل",
      "خل",
      "ملح",
      "حبوب سوداء أو سمسم محمص"
    ],

    steps: [
      "اسلقي الروبيان بدون القشر في الماء مع الخل والملح.",
      "بعد النضج، تبليه بالفلفل الأسود والملح.",

      "قطعي جميع الخضار إلى شرائح رفيعة.",
      "افصلي أوراق الخس إلى قطع صغيرة.",

      "اغسلي ورقة الأرز سريعاً بالماء البارد لبضع ثوانٍ.",
      "ضعيها على طبق غير لاصق.",

      "ضعي ثلاث حبات روبيان في المنتصف.",
      "أضيفي الأفوكادو والخيار والجزر والأعشاب والبصل الأخضر والخس.",

      "اثني الجزء السفلي فوق الحشوة.",
      "اثني الجانبين للداخل.",
      "لفي بإحكام من الأسفل للأعلى.",

      "زيني بالسمسم أو الحبوب السوداء."
    ],

    notes: "يمكن استخدام التوفو لنسخة نباتية."
  },

  sauce: {
    en: [
      "2 tbsp peanut butter",
      "1 tbsp soy sauce",
      "1 tbsp rice vinegar",
      "1 tsp sesame oil",
      "1 tsp maple syrup or honey",
      "1 minced garlic clove",
      "1/2 tsp grated ginger",
      "1/4 tsp gochugaru or chili flakes",
      "1–2 tbsp warm water"
    ],

    ar: [
      "ملعقتان زبدة فول سوداني",
      "ملعقة صويا صوص",
      "ملعقة خل أرز",
      "ملعقة صغيرة زيت سمسم",
      "ملعقة صغيرة شراب قيقب أو عسل",
      "فص ثوم مفروم",
      "نصف ملعقة زنجبيل مبشور",
      "ربع ملعقة فلفل كوري أو فلفل مجروش",
      "1–2 ملعقة ماء دافئ"
    ]
  }
},
{
  id: 20,
  image: "/images/musakhan-rolls.jpg",
  category: "Middle Eastern",

  en: {
    title: "Musakhan Rolls",
    description: "Crispy oven-baked rolls filled with tender chicken, caramelized onions, olive oil, and fragrant sumac.",

    ingredients: [
      "1 large red onion",
      "Half whole chicken",
      "Water",
      "Sumac",
      "Salt",
      "1 cube chicken bouillon",
      "1 medium white onion",
      "1/3 cup olive oil",
      "Lemon",
      "Saj or Arabic bread",
      "Bay leaves",
      "Black pepper"
    ],

    steps: [
      "Bring water to a boil in a pot.",
      "Add the chicken, sliced white onion, bay leaves, and black pepper.",
      "Cook for 30–40 minutes until fully cooked and tender.",

      "Heat olive oil in a large pan over medium heat.",
      "Add thinly sliced red onions.",
      "Cook until softened and lightly caramelized.",

      "Remove the cooked chicken from the pot.",
      "Shred the chicken using two forks.",

      "Add the shredded chicken to the onions.",
      "Add sumac, salt, and chicken bouillon.",
      "Mix well and cook on medium heat.",

      "Cut the saj bread into triangular pieces.",

      "Place the chicken filling on the wider side.",
      "Roll tightly.",

      "Preheat the oven to 400°F (200°C).",

      "Place the rolls next to each other in a baking tray.",
      "Brush the tops lightly with olive oil.",

      "Bake from the top or broil for 5–8 minutes until golden and crispy."
    ],

    notes: "Add lemon only if your sumac is not sour enough."
  },

  ar: {
    title: "رولات مسخن",
    description: "رولات مقرمشة بالفرن محشوة بالدجاج الطري والبصل وزيت الزيتون والسماق.",

    ingredients: [
      "بصلة حمراء كبيرة",
      "نصف دجاجة كاملة",
      "ماء",
      "سماق",
      "ملح",
      "مكعب مرق دجاج",
      "بصلة بيضاء متوسطة",
      "ثلث كوب زيت زيتون",
      "ليمون",
      "خبز صاج أو خبز عربي",
      "ورق غار",
      "فلفل أسود"
    ],

    steps: [
      "اغلي الماء في قدر.",
      "أضيفي الدجاج والبصل الأبيض المقطع وورق الغار والفلفل الأسود.",
      "اطبخي لمدة 30 إلى 40 دقيقة حتى ينضج الدجاج.",

      "سخني زيت الزيتون في مقلاة على نار متوسطة.",
      "أضيفي البصل الأحمر المقطع.",
      "اطبخيه حتى يصبح طرياً ومكرملاً قليلاً.",

      "أخرجي الدجاج من القدر.",
      "فتتي الدجاج باستخدام شوكتين.",

      "أضيفي الدجاج المفتت إلى البصل.",
      "أضيفي السماق والملح ومكعب المرق.",
      "اخلطي جيداً على نار متوسطة.",

      "قطعي خبز الصاج إلى مثلثات.",

      "ضعي الحشوة على الطرف الأعرض.",
      "لفيها بإحكام.",

      "سخني الفرن إلى 200 درجة مئوية.",

      "رتبي الرولات في صينية.",
      "ادهني الوجه بقليل من زيت الزيتون.",

      "اخبزيها من الأعلى لمدة 5–8 دقائق حتى تصبح ذهبية ومقرمشة."
    ],

    notes: "أضيفي الليمون فقط إذا كان السماق غير حامض بما يكفي."
  }
},
{
  id: 21,
  image: "/images/miso-chicken-noodle-soup.jpg",
  category: "Soups",

  en: {
    title: "Creamy Miso Chicken Noodle Soup",
    description: "A rich homemade noodle soup with chicken stock, miso, mushrooms, soft eggs, and aromatic herbs.",

    ingredients: [
      "Noodles",
      "Chicken with bones",
      "Mushrooms",
      "Spring onion",
      "Cilantro",
      "Garlic",
      "Eggs",
      "Peanut butter",
      "Milk",
      "Miso paste",
      "Rice vinegar",
      "Soy sauce",
      "Brown sugar",
      "Sesame oil",
      "Bay leaves",
      "Cloves",
      "Carrot",
      "White onion",
      "Lamb bouillon",
      "Crispy chili oil"
    ],

    steps: [
      "Remove the cooked chicken meat from the bones and set the meat aside.",

      "Add the chicken bones to a pot with hot water.",
      "Add bay leaves, cloves, carrot, white onion, and lamb bouillon.",
      "Bring to a boil on medium heat.",
      "Strain the stock and reserve it.",

      "Heat sesame oil in another pot.",
      "Add 3 cloves of minced garlic.",

      "Add peanut butter and miso paste.",
      "Mix well.",

      "Add soy sauce, rice vinegar, and brown sugar.",
      "Stir well.",

      "Slowly add the chicken stock.",
      "Mix until smooth.",

      "Add milk.",
      "Let it gently simmer.",

      "Add the shredded chicken.",

      "Once it starts boiling, add cilantro and spring onions.",
      "Cook for 5 minutes on medium heat.",

      "In another pan, cook the mushrooms with soy sauce and sesame oil.",

      "Cook the noodles separately.",

      "Toss the noodles with soy sauce, rice vinegar, and sesame oil.",

      "Place noodles in a bowl.",
      "Pour the hot soup over them.",

      "Top with mushrooms, boiled eggs, and crispy chili oil."
    ],

    notes: "Miso adds depth, but the soup still works without it."
  },

  ar: {
    title: "شوربة نودلز بالدجاج والميسو الكريمية",
    description: "شوربة نودلز غنية بمرق الدجاج والميسو والفطر والبيض والأعشاب الطازجة.",

    ingredients: [
      "نودلز",
      "دجاج مع العظم",
      "فطر",
      "بصل أخضر",
      "كزبرة",
      "ثوم",
      "بيض",
      "زبدة فول سوداني",
      "حليب",
      "معجون ميسو",
      "خل الأرز",
      "صويا صوص",
      "سكر بني",
      "زيت سمسم",
      "ورق غار",
      "قرنفل",
      "جزر",
      "بصل أبيض",
      "مكعب مرق",
      "زيت شطة مقرمش"
    ],

    steps: [
      "أزيلي لحم الدجاج المطبوخ من العظم واتركيه جانباً.",

      "ضعي العظام في قدر مع ماء ساخن.",
      "أضيفي ورق الغار والقرنفل والجزر والبصل الأبيض ومكعب المرق.",
      "اتركيه يغلي على نار متوسطة.",
      "صفي المرق واحتفظي به.",

      "في قدر آخر، سخني زيت السمسم.",
      "أضيفي 3 فصوص ثوم مفروم.",

      "أضيفي زبدة الفول السوداني ومعجون الميسو.",
      "اخلطي جيداً.",

      "أضيفي الصويا صوص وخل الأرز والسكر البني.",
      "اخلطي جيداً.",

      "أضيفي مرق الدجاج تدريجياً.",
      "اخلطي حتى يصبح القوام ناعماً.",

      "أضيفي الحليب.",
      "اتركيه يغلي بهدوء.",

      "أضيفي الدجاج المفتت.",

      "عندما يبدأ بالغليان، أضيفي الكزبرة والبصل الأخضر.",
      "اطبخي لمدة 5 دقائق.",

      "في مقلاة أخرى، اطبخي الفطر مع الصويا صوص وزيت السمسم.",

      "اطبخي النودلز بشكل منفصل.",

      "اخلطي النودلز مع الصويا صوص وخل الأرز وزيت السمسم.",

      "ضعي النودلز في الوعاء.",
      "اسكبي الشوربة فوقها.",

      "زيني بالفطر والبيض المسلوق وزيت الشطة المقرمش."
    ],

    notes: "يمكن تحضيرها بدون الميسو أيضاً."
  }
},
]

// =============================================
//  HOW TO ADD A NEW RECIPE:
//
//  1. Copy the block above (id: 3 block)
//  2. Paste it after the last recipe
//  3. Change the id to the next number (e.g. 4)
//  4. Fill in English (en) and Arabic (ar) fields
//  5. Place your photo in public/images/
//  6. Update the image path to "/images/yourfile.jpg"
// =============================================
