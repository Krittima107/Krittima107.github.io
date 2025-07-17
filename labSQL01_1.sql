Select * from Employees
--
Select EmployeeID, FirstName, LastName from Employees
--
Select * from Employees WHERE City='London'
--
SELECT EmployeeID,FirstName,Lastname FROM Employees WHERE City = 'London'
--
Select City,Country  from Customers
--
SELECT DISTINCT City, Country FROM Customers
--
SELECT * FROM Products WHERE Unitprice > 200
--
SELECT * FROM Customers WHERE Country = 'USA' OR City = 'Vancouver'
--
SELECT * FROM Products WHERE UnitPrice >= 50 AND UnitsInStock < 20
--แสดงข้อมูลสินค้าที่มีที่มีจำนวนคงเหลือต่ำกว่า 20
SELECT * FROM Products WHERE UnitPrice BETWEEN 50 AND 100
--
SELECT * FROM Products WHERE UnitPrice >= 50 AND UnitPrice<=100
--
SELECT * FROM Customers WHERE Country IN ('Brazil','Argentina','Mexico');
--
SELECT * FROM Customers WHERE Country = 'Brazil' or Country = 'Argentina' or Country = 'Mexico'
--
SELECT * FROM Employees WHERE FirstName LIKE 'N%'
--
SELECT * FROM Customers WHERE CompanyName LIKE 'A%'
--
SELECT * FROM Customers WHERE CompanyName LIKE '%Y'
--
SELECT firstname, lastname FROM Employees WHERE FirstName LIKE '%an%'
--ต้องการชื่อ-นามสกุล พนักงานที่มีชื่อประกอบด้วยตัว 'an'
SELECT * FROM Employees WHERE FirstName LIKE '_____'
--
SELECT ProductID,ProductName,UnitPrice FROM Products ORDER BY UnitPrice DESC
--แสดงข้อมูลรหัสสินค้า, ชื่อสินค้า และราคา โดยเรียงลำดับผลลัพธ์จากราคาสูงที่สุดไปต่ำที่สุด
SELECT CompanyName, ContactName FROM Customers ORDER BY ContactName ASC
--แสดงข้อมูลชื่อบริษัทที่เป็นลูกค้า และชื่อผู้ติดต่อ โดยเรียงลำดับชื่อผู้ติดต่อตามลำดับตัวอักษร
SELECT top 10 ProductName ,UnitPrice FROM Products order by UnitsInStock DESC
--
SELECT CategoryID, ProductName, UnitPrice FROM Products ORDER BY CategoryID ASC , UnitPrice DESC
