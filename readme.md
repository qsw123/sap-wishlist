SAP -- WhishList

标签（空格分隔）： Cloud

WishlistDemo
------------

----------
(no Junit test added)

1. to use **document** service:
[url = https://api.beta.yaas.io/hybris/document/v1/{tenant}/{clientId}/data/{docType};]
    - we need credentials to access its APIs because it goes through the YaaS API proxy for safty.
    - so we need to create organization in Builder to:
        - subscribe pacages
    - create a project to:
        - select scopes
    - create client(Tenant) to:
        - get/use credentials, client id, client secret

    > below is for document service accessing:
    ```
    wishlist-demo\src\main\java\com\sample\wishlistDemo\DocuServiceWrapper.java
    wishlist-demo\src\main\java\com\sample\wishlistDemo\OAuthWrapper.java
    ```
    > below is to use document service:
    ```
    wishlist-demo\src\main\java\com\sample\wishlistDemo\api\generated\DefaultWishlistsResource.java
    ```
    > below is where credentials are defined:
    ```
    wishlist-demo\src\main\resources\default.properties
    ```


2. to get total price of a wishlist, i add a **price** property for wishlist item：
    ```
    wishlistDemo\src\main\webapp\meta-data\api.raml // this is where restful APIs are defined. i am not providing API to get total price of a wishlist , i do it in front-end. so this file is not changed.
    wishlistDemo\src\main\webapp\meta-data\schemas\wishlistItem.json //defins the structer of wishlist item
    wishlistDemo\src\main\webapp\meta-data\examples\wishlistItem-example.json // example of wish list item
    ```
3. seems a wishlist belongs to a customer. so need to create a test customer using customer service. just ingore this.

yaas-storefront
---------------

(no Jasmine/Karma/E2E test added)


----------

[controller(: model + user interaction)  --> UI service  --> REST endpoint]

1. add button in product details page:
   

    ```
    yaas-storefront\public\js\products\templates\product-detail.html // this is where button be displayed and event be attached
    yaas-storefront\public\js\products\controllers\product-detail-ctrl.js // this is where event be handled: add a item to a wishlist
    yaas-storefront\public\js\products\products-index.js // this is where module dependency be injected.
    ```

 
2. add display/button in account detail page(did not use PaginatedCollection)

    ```
    yaas-storefront\public\js\app\account\templates\account.html // this is where wishlist be displayed and button for getting price be added. it uses ng-repeat to display all wishlist items.
    yaas-storefront\public\js\account\controllers\account-ctrl.js // here when "My Account" is clicked, the init function is called and wishlist is injected. the function to get total price is also placed in this file(just simple alert. not using dialog).
    yaas-storefront\public\js\shared\router.js // this is where wishlist be resolved.
    ``` 
3. Wishlist service

    ```
    yaas-storefront\public\js\wishlist\wishlist-index.js // define module for wishlist
    yaas-storefront\public\js\wishlist\wishlist-rest.js  // return Restangular object which handles restful request/respone for wishlist service
    yaas-storefront\public\js\wishlist\wishlist-service.js // wishlist service for ui logic 
    ```

4. Localization
    ```
    yaas-storefront\public\js\shared\i18n\lang
    ```  
5. URL for wishlist service  

    ```
    yaas-storefront\public\js\shared\site-config.js // set URL of getting wishlist service to localhost
    ```       
    
6. index.html  
    ```
    yaas-storefront\public\index.html // load new js files
    ```  


----------


#### **YaaS**  
> &emsp;- [YaaS Archives](http://labs.hybris.com/category/yaas/)
&emsp;YaaS is a cloud offering by hybris.
&emsp;It uses a **microservices** architecture – this means that instead of having a single, complex software, it is broken down in small services that provide a certain function. For example, there is a product service that let’s you manage and configure products you would use in a webshop.
There are lots of services that you can use and combine to build an application.
A simple webshop would use services such as Customer, Product, Cart, Checkout, Payment, and so on.
...
&emsp;A **client** is, to keep it short, a set of credentials that you can use to receive **API Tokens**.
&emsp;The API Tokens are necessary as YaaS authenticates with OAuth2.
...
&emsp;You will see the plaintext of your **Client ID** and **Client Secret**. These are your login data, you need them when you talk to YaaS to receive an **Access Token** (for now just have the data ready, we’ll use the SDK for receiving a token).
> &emsp;- [YaaS in a Nutshell](https://devportal.yaas.io/overview/yaasinanutshell/index.html)
**Scopes**
&emsp;The permission settings in YaaS are called, scopes. A scope is a permission setting that specifies access to resources and methods in a service. It is used in combination with authorization. APIs are secured using the OAuth 2.0 protocol, which provides account authentication and authorization with the use of a bearer access token. In order to use the APIs, you need a client ID, which can be found in your project in the Builder. After successful authentication, the service verifies project members and grants the required scopes.
For more information about authorization, read the Security and the OAuth2 service documentation.
**Single-tenancy and Multi-tenancy**
&emsp;When you create a Project in the Builder, you are this project's Owner. You can assign user roles, invite other developers to your project, subscribe to packages or Builder modules, and add clients. Use the client's Client ID and Client Secret to obtain an access token from the OAuth2 service, which allows you to access YaaS APIs within the scope of the client's parent project. This is Single-tenancy in YaaS.
Once you are familiar with the concepts and principles of the YaaS API environment, you can create services and Builder modules and wrap them into packages. Use them as private packages, or monetize your ideas on the YaaS Market.
&emsp;Multi-tenancy is another key concept in YaaS. In the software industry, it is usually defined as a main principle in architecture where a single instance of the software runs on a server, serving multiple client-organizations, or tenants. On the YaaS platform, which brings developers and business together, the client-organization concept is redefined as a project.

To work with services created by a different tenant, subscribe to a package that includes that specific service within your project. With each subscription, the subscriber acknowledges that a service can obtain access tokens to interact within YaaS in the name of the subscribing tenant. This is multi-tenancy in YaaS.


#### **Maven: 项目管理工具**    
&emsp;- mvn help:system:下载并运行help插件，检查环境变量;
&emsp;- mvn -D: Define a system property;
&emsp;- mvn archetype:generate: 创建项目的脚手架，即代码框架，比如按规则生成的文件，目录等。
&emsp;- mvn clean install： 清除工程并编译
&emsp;- mvn jetty:run： 在jetty中运行service
&emsp;- mvn eclipse:m2eclipse: 转换maven工程为eclipse工程
&emsp;- POM.xml：Maven的项目对象模型; 定义项目的基本信息，描述项目如何构建，项目依赖,插件等。类似于Makefile。

#### **jersey**： 基于Java的一个轻量级RESTful风格的Web Services框架
#### **Jetty**: 一个Java实现的开源的servlet容器, 类比Tomcat。
&emsp;- Servlet是一个Java编写的程序，此程序是基于Http协议的，在服务器端运行的(如tomcat)，是按照Servlet规范编写的一个Java类。

#### **RAML**：RESTful API Modeling Language 即RESTful API建模语言
&emsp;- 是对RESTful API的一种简单和直接的描述
&emsp;- [RAML 6-Step Tutorial](http://raml.org/docs.html)
&emsp;- [RAML, Schema, Traits](http://www.cnblogs.com/darrenji/p/5198524.html)
#### **Micro Service**
&emsp;- REST service using the YaaS Service SDK. can run locally or be deployed to a cloud environment.
&emsp;- [REST:表述术状态迁移](http://www.cnblogs.com/loveis715/p/4669091.html)


#### **Restangular**
&emsp;- [Restangular](https://github.com/mgonto/restangular)
#### **目录结构**
```
src/main/webapp/meta-data: raml
src/main/java: generated java class from raml
src/main/resource: configuration file
src/test: JUnit test class for DefaultWishlistResourceTest

```
#### **src/main/java**
```
src/main/java: // JerseyApplication - registers all of the resources defined in the api.raml file
com.sample.wishlist.api.generated: // DefaultWishlistResource - contains files that are generated from the RAML API definition. such as, get/post methods for whishlists/whishlist/whishlistitems
target/generated-sources/service： // parent interface of the DefaultWishlistResource 
```
#### **Service：** implmented by Java and runs in jetty server.
step to create a service:
&emsp;1. add a resource definition in api.raml, and its corresponding schema definition
&emsp;2. add the new resource implementation
&emsp;3. compile and run: mvn clean install, mvn jetty:run

#### **Sign in**
1. user.signin.email
2. user.signin.password
3. signin(user.signin, singinForm)
4. AuthSvc.signin
5. loginAndSetToken(user)
6. AuthREST.Customers.all('login').customPOST(user)

