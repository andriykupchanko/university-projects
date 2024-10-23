#include <SPI.h>
#include <Ethernet.h>

// MAC-адреса
byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFA, 0xCE};

// HTTP-сервер на порту 80
EthernetServer server(80);

// Declare temperature and humidity variables
float temperatureDataOne = 25.0; // Initialize with a default value
float humidityDateOne = 60.0;    // Initialize with a default value

void setup()
{
    // Ініціалізація серійного порту
    Serial.begin(9600);

    // Налаштування Ethernet з DHCP
    if (Ethernet.begin(mac) == 0)
    {
        Serial.println("DHCP failed, setting static IP.");
        // Якщо DHCP не вдалося, можна встановити статичну IP-адресу
        IPAddress ip(192, 168, 1, 177); // Змініть на вашу статичну IP-адресу
        Ethernet.begin(mac, ip);
    }

    // Вивід призначеної IP-адреси
    Serial.print("Assigned IP: ");
    Ethernet.localIP().printTo(Serial); // Виводимо IP-адресу
    Serial.println();                   // Перехід на новий рядок

    // Запуск сервера
    server.begin();
}

void loop()
{
    EthernetClient client = server.available();
    if (client)
    {
        Serial.println("Client connected");
        String request = "";

        // Зчитуємо дані від клієнта
        while (client.connected())
        {
            if (client.available())
            {
                char c = client.read();
                request += c;

                // Виводимо запит у серійний монітор
                Serial.print(c);

                // Перевірка закінчення запиту
                if (c == '\n')
                {
                    Serial.print("Full Request: ");
                    Serial.println(request); // Виводимо повний запит

                    // Виведення IP-адреси в серійний монітор
                    Serial.print("Current IP: ");
                    Serial.print(Ethernet.localIP()); // Виводимо IP-адресу

                    // Обробка GET-запиту для отримання IP-адреси
                    if (request.indexOf("GET /") >= 0)
                    {
                        Serial.println("GET request received");
                        client.println("HTTP/1.1 200 OK");
                        client.println("Content-Type: application/json");
                        client.println("Connection: close");
                        client.println();
                        client.println("{ \"temperature\": " + String(temperatureDataOne) + ",\n\t\"humidity\": " + String(humidityDateOne) + "}");
                    }
                    // Обробка запиту на кореневий шлях
                    else if (request.indexOf("GET /") >= 0)
                    {
                        client.println("HTTP/1.1 302 Found");
                        client.println("Location: /ip");
                        client.println("Connection: close");
                        client.println();
                    }
                    // Інші GET-запити
                    else
                    {
                        client.println("HTTP/1.1 404 Not Found");
                        client.println("Content-Type: text/plain");
                        client.println("Connection: close");
                        client.println();
                        client.println("404 Not Found");
                    }
                    break;
                }
            }
        }
        client.stop();
        Serial.println("Client disconnected");
    }
}
