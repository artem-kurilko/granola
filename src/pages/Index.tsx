"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Leaf, Truck, Award } from "lucide-react";
import CartSheet from "@/components/CartSheet";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const [cartItems, setCartItems] = useState(0);

  const products = [
    {
      id: 1,
      name: "Класична гранола",
      description: "Традиційний рецепт з вівсяними пластівцями, медом та горіхами",
      price: 150,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Шоколадна гранола",
      description: "З шматочками темного шоколаду та кокосовою стружкою",
      price: 170,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Фруктова гранола",
      description: "З сушеними ягодами, курагою та родзинками",
      price: 160,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Горіхова гранола",
      description: "З грецькими горіхами, мигдалем та ліщиною",
      price: 180,
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  const addToCart = (productId: number) => {
    setCartItems(prev => prev + 1);
    // In a real app, this would add to cart state
    console.log(`Added product ${productId} to cart`);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const openCart = () => {
    const cartTrigger = document.querySelector('[data-cart-sheet-trigger]');
    if (cartTrigger) {
      cartTrigger.dispatchEvent(new Event('click'));
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-amber-600" />
            <h1 className="text-2xl font-bold text-amber-800">Granola House</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection("products")} 
              className="text-amber-800 hover:text-amber-600 font-medium transition-colors duration-300"
            >
              Продукти
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className="text-amber-800 hover:text-amber-600 font-medium transition-colors duration-300"
            >
              Про нас
            </button>
            <button 
              onClick={() => scrollToSection("reviews")} 
              className="text-amber-800 hover:text-amber-600 font-medium transition-colors duration-300"
            >
              Відгуки
            </button>
            <button 
              onClick={() => scrollToSection("delivery")} 
              className="text-amber-800 hover:text-amber-600 font-medium transition-colors duration-300"
            >
              Доставка
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <CartSheet />
            <Button 
              className="bg-amber-600 hover:bg-amber-700 text-white transition-all duration-300"
              onClick={openCart}
            >
              Замовити
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-amber-100 to-amber-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              Натуральна гранола <br />
              <span className="text-amber-600">домашнього приготування</span>
            </h1>
            <p className="text-lg text-amber-800 mb-8">
              Свіжі інгредієнти, ретельно підібрані горіхи та фрукти. 
              Корисний сніданок для всієї родини!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="bg-amber-600 hover:bg-amber-700 text-white text-lg py-6 px-8 transition-all duration-300"
                onClick={openCart}
              >
                Замовити зараз
              </Button>
              <Button 
                variant="outline" 
                className="border-amber-600 text-amber-600 hover:bg-amber-50 text-lg py-6 px-8 transition-all duration-300"
                onClick={() => scrollToSection("products")}
              >
                Дізнатись більше
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="bg-amber-200 border-2 border-dashed rounded-xl w-64 h-64 md:w-80 md:h-80" />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                <p className="font-bold text-amber-800">100% натуральні інгредієнти</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Чому обирають нашу гранолу?</h2>
            <p className="text-amber-700 max-w-2xl mx-auto">
              Ми створюємо корисні та смачні сніданки, використовуючи лише якісні інгредієнти
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Натуральні інгредієнти</h3>
              <p className="text-amber-700">
                Лише свіжі горіхи, фрукти та злаки без консервантів та штучних добавок
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Якість</h3>
              <p className="text-amber-700">
                Кожна партія проходить суворий контроль якості перед упаковкою
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Швидка доставка</h3>
              <p className="text-amber-700">
                Доставляємо свіжу гранолу протягом 1-2 днів по всій країні
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Наша гранола</h2>
            <p className="text-amber-700 max-w-2xl mx-auto">
              Різноманітні смаки для кожного члена родини
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Відгуки наших клієнтів</h2>
            <p className="text-amber-700 max-w-2xl mx-auto">
              Що говорять ті, хто вже скуштував нашу гранолу
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-amber-200 border-2 border-dashed rounded-full w-12 h-12" />
                <div className="ml-4">
                  <h4 className="font-bold text-amber-900">Анна Петрова</h4>
                </div>
              </div>
              <p className="text-amber-700">
                "Найкраща гранола, яку я пробувала! Свіжий смак, хрумка текстура. 
                Замовляю вже третій раз. Діти обожнюють!"
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-amber-200 border-2 border-dashed rounded-full w-12 h-12" />
                <div className="ml-4">
                  <h4 className="font-bold text-amber-900">Іван Сидоров</h4>
                </div>
              </div>
              <p className="text-amber-700">
                "Замовив класичну гранолу для сніданків на роботі. 
                Завжди свіжа, поживна і дуже смачна. Рекомендую!"
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-amber-200 border-2 border-dashed rounded-full w-12 h-12" />
                <div className="ml-4">
                  <h4 className="font-bold text-amber-900">Марія Козлова</h4>
                </div>
              </div>
              <p className="text-amber-700">
                "Дуже задоволена якістю та смаком. Особливо подобається фруктова гранола. 
                Упаковка гарна, термін придатності дотримується."
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section id="delivery" className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Доставка та оплата</h2>
            <p className="text-amber-700 max-w-2xl mx-auto">
              Зручні способи отримання та оплати замовлення
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-6">Як ми доставляємо</h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-amber-900">Оформлення замовлення</h4>
                    <p className="text-amber-700">Виберіть продукти та вкажіть адресу доставки</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-amber-900">Підготовка</h4>
                    <p className="text-amber-700">Готуємо ваше замовлення протягом 24 годин</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-amber-900">Доставка</h4>
                    <p className="text-amber-700">Доставляємо кур'єром протягом 1-2 днів</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-amber-900 mb-6">Способи оплати</h3>
              
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <div className="bg-amber-200 border-2 border-dashed rounded w-8 h-8" />
                  </div>
                  <span className="ml-4 text-amber-900 font-medium">Готівкою при отриманні</span>
                </li>
                
                <li className="flex items-center">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <div className="bg-amber-200 border-2 border-dashed rounded w-8 h-8" />
                  </div>
                  <span className="ml-4 text-amber-900 font-medium">Банківською карткою онлайн</span>
                </li>
                
                <li className="flex items-center">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <div className="bg-amber-200 border-2 border-dashed rounded w-8 h-8" />
                  </div>
                  <span className="ml-4 text-amber-900 font-medium">Електронні гаманці</span>
                </li>
              </ul>
              
              <div className="mt-8 p-4 bg-amber-100 rounded-lg">
                <p className="text-amber-800">
                  <span className="font-bold">Безкоштовна доставка</span> при замовленні від 500 ₴
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Готові скуштувати нашу гранолу?
          </h2>
          <p className="text-amber-100 text-xl mb-8 max-w-2xl mx-auto">
            Зробіть замовлення прямо зараз і отримайте знижку 10% на перше замовлення
          </p>
          <Button 
            className="bg-white text-amber-600 hover:bg-amber-50 text-lg py-6 px-8 font-bold transition-all duration-300"
            onClick={openCart}
          >
            Замовити зі знижкою
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-amber-400" />
                <h3 className="text-xl font-bold text-white">Granola House</h3>
              </div>
              <p className="mb-4">
                Натуральна гранола домашнього приготування з 2015 року
              </p>
              <div className="flex space-x-4">
                <div className="bg-amber-800 p-2 rounded-full">
                  <div className="bg-amber-200 border-2 border-dashed rounded w-5 h-5" />
                </div>
                <div className="bg-amber-800 p-2 rounded-full">
                  <div className="bg-amber-200 border-2 border-dashed rounded w-5 h-5" />
                </div>
                <div className="bg-amber-800 p-2 rounded-full">
                  <div className="bg-amber-200 border-2 border-dashed rounded w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Каталог</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-300 transition-colors">Класична гранола</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">Шоколадна гранола</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">Фруктова гранола</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">Горіхова гранола</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Інформація</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-300 transition-colors">Про нас</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">Доставка та оплата</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">Відгуки</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">Контакти</a></li>
                <li><a href="/public-offer" className="hover:text-amber-300 transition-colors">Публічна оферта</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Контакти</h4>
              <ul className="space-y-2">
                <li>м. Київ, вул. Прикладна, 123</li>
                <li>+380 (44) 123-45-67</li>
                <li>info@granola-house.ua</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-amber-800 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Granola House. Всі права захищені.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;