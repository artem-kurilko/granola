"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Star, Leaf, Truck, Award } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import CartSheet from "@/components/CartSheet";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const [cartItems, setCartItems] = useState(0);

  const products = [
    {
      id: 1,
      name: "Классическая гранола",
      description: "Традиционный рецепт с овсяными хлопьями, медом и орехами",
      price: 350,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Шоколадная гранола",
      description: "С кусочками темного шоколада и кокосовой стружкой",
      price: 390,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Фруктовая гранола",
      description: "С сушеными ягодами, курагой и изюмом",
      price: 370,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Ореховая гранола",
      description: "С грецкими орехами, миндалем и фундуком",
      price: 420,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
    },
  ];

  const addToCart = (productId: number) => {
    setCartItems(prev => prev + 1);
    // In a real app, this would add to cart state
    console.log(`Added product ${productId} to cart`);
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
            <a href="#products" className="text-amber-800 hover:text-amber-600 font-medium">Продукты</a>
            <a href="#about" className="text-amber-800 hover:text-amber-600 font-medium">О нас</a>
            <a href="#reviews" className="text-amber-800 hover:text-amber-600 font-medium">Отзывы</a>
            <a href="#delivery" className="text-amber-800 hover:text-amber-600 font-medium">Доставка</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <CartSheet />
            <Button 
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => document.querySelector('[data-cart-sheet-trigger]')?.dispatchEvent(new Event('click'))}
            >
              Заказать
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-amber-100 to-amber-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              Натуральная гранола <br />
              <span className="text-amber-600">домашнего приготовления</span>
            </h1>
            <p className="text-lg text-amber-800 mb-8">
              Свежие ингредиенты, тщательно отобранные орехи и фрукты. 
              Полезный завтрак для всей семьи!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="bg-amber-600 hover:bg-amber-700 text-white text-lg py-6 px-8"
                onClick={() => document.querySelector('[data-cart-sheet-trigger]')?.dispatchEvent(new Event('click'))}
              >
                Заказать сейчас
              </Button>
              <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50 text-lg py-6 px-8">
                Узнать больше
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="bg-amber-200 border-2 border-dashed rounded-xl w-64 h-64 md:w-80 md:h-80" />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                <p className="font-bold text-amber-800">100% натуральные ингредиенты</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Почему выбирают нашу гранолу?</h2>
            <p className="text-amber-700 max-w-2xl mx-auto">
              Мы создаем полезные и вкусные завтраки, используя только качественные ингредиенты
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Натуральные ингредиенты</h3>
              <p className="text-amber-700">
                Только свежие орехи, фрукты и злаки без консервантов и искусственных добавок
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Качество</h3>
              <p className="text-amber-700">
                Каждая партия проходит строгий контроль качества перед упаковкой
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Быстрая доставка</h3>
              <p className="text-amber-700">
                Доставляем свежую гранолу в течение 1-2 дней по всей стране
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
              Разнообразные вкусы для каждого члена семьи
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
                rating={product.rating}
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
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Отзывы наших клиентов</h2>
            <p className="text-amber-700 max-w-2xl mx-auto">
              Что говорят те, кто уже попробовал нашу гранолу
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-amber-200 border-2 border-dashed rounded-full w-12 h-12" />
                <div className="ml-4">
                  <h4 className="font-bold text-amber-900">Анна Петрова</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-amber-700">
                "Лучшая гранола, которую я пробовала! Свежий вкус, хрустящая текстура. 
                Заказываю уже третий раз. Дети обожают!"
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-amber-200 border-2 border-dashed rounded-full w-12 h-12" />
                <div className="ml-4">
                  <h4 className="font-bold text-amber-900">Иван Сидоров</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-amber-700">
                "Заказал классическую гранолу для завтраков на работе. 
                Всегда свежая, питательная и очень вкусная. Рекомендую!"
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-amber-200 border-2 border-dashed rounded-full w-12 h-12" />
                <div className="ml-4">
                  <h4 className="font-bold text-amber-900">Мария Козлова</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-amber-700">
                "Очень довольна качеством и вкусом. Особенно нравится фруктовая гранола. 
                Упаковка красивая, срок годности соблюдается."
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section id="delivery" className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Доставка и оплата</h2>
            <p className="text-amber-700 max-w-2xl mx-auto">
              Удобные способы получения и оплаты заказа
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-6">Как мы доставляем</h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-amber-900">Оформление заказа</h4>
                    <p className="text-amber-700">Выберите продукты и укажите адрес доставки</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-amber-900">Подготовка</h4>
                    <p className="text-amber-700">Готовим ваш заказ в течение 24 часов</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-amber-900">Доставка</h4>
                    <p className="text-amber-700">Доставляем курьером в течение 1-2 дней</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-amber-900 mb-6">Способы оплаты</h3>
              
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <div className="bg-amber-200 border-2 border-dashed rounded w-8 h-8" />
                  </div>
                  <span className="ml-4 text-amber-900 font-medium">Наличными при получении</span>
                </li>
                
                <li className="flex items-center">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <div className="bg-amber-200 border-2 border-dashed rounded w-8 h-8" />
                  </div>
                  <span className="ml-4 text-amber-900 font-medium">Банковской картой онлайн</span>
                </li>
                
                <li className="flex items-center">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <div className="bg-amber-200 border-2 border-dashed rounded w-8 h-8" />
                  </div>
                  <span className="ml-4 text-amber-900 font-medium">Электронные кошельки</span>
                </li>
              </ul>
              
              <div className="mt-8 p-4 bg-amber-100 rounded-lg">
                <p className="text-amber-800">
                  <span className="font-bold">Бесплатная доставка</span> при заказе от 1000 ₽
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
            Готовы попробовать нашу гранолу?
          </h2>
          <p className="text-amber-100 text-xl mb-8 max-w-2xl mx-auto">
            Сделайте заказ прямо сейчас и получите скидку 10% на первый заказ
          </p>
          <Button 
            className="bg-white text-amber-600 hover:bg-amber-50 text-lg py-6 px-8 font-bold"
            onClick={() => document.querySelector('[data-cart-sheet-trigger]')?.dispatchEvent(new Event('click'))}
          >
            Заказать со скидкой
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
                Натуральная гранола домашнего приготовления с 2015 года
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
                <li><a href="#" className="hover:text-amber-300">Классическая гранола</a></li>
                <li><a href="#" className="hover:text-amber-300">Шоколадная гранола</a></li>
                <li><a href="#" className="hover:text-amber-300">Фруктовая гранола</a></li>
                <li><a href="#" className="hover:text-amber-300">Ореховая гранола</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Информация</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-300">О нас</a></li>
                <li><a href="#" className="hover:text-amber-300">Доставка и оплата</a></li>
                <li><a href="#" className="hover:text-amber-300">Отзывы</a></li>
                <li><a href="#" className="hover:text-amber-300">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Контакты</h4>
              <ul className="space-y-2">
                <li>г. Москва, ул. Примерная, 123</li>
                <li>+7 (495) 123-45-67</li>
                <li>info@granola-house.ru</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-amber-800 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Granola House. Все права защищены.</p>
          </div>
        </div>
      </footer>
      
      <MadeWithDyad />
    </div>
  );
};

export default Index;