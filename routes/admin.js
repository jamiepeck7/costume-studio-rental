const path = require('path');
const express = require('express');
const {body, check} = require('express-validator');
 
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-costume => GET
//router.get('/add-costume', isAuth, adminController.getAddCostume);

// /admin/costumes => GET
//router.get('/costumes', isAuth, adminController.getCostumes);

// /admin/add-costume => POST
router.post(
	'/add-costume',
	[
	body('category')
		.isString()
		.isLength({ min: 3 })
		.trim(),
	body('costumeName')
		.isString()
		.isLength({ min: 3 })
		.trim(),
	body('rentalFee').isFloat(),
	body('size')
		.isString()
		.isLength({ min: 1 })
		.trim(),
	body('image').isURL(),
	body('description')
		.isLength({ min: 5, max: 400 })
		.trim()
	],
	isAuth,
	adminController.postAddCostume
);

// /admin/edit-costume/:costumeId => GET
//router.get('/edit-costume/:costumeId', isAuth, adminController.getEditCostume);

// /admin/edit-costume => POST
router.post(
	'/edit-costume',
	[
	body('category')
		.isString()
		.isLength({ min: 3 })
		.trim(),
	body('costumeName')
		.isString()
		.isLength({ min: 3 })
		.trim(),
	body('rentalFee').isFloat(),
	body('size')
		.isString()
		.isLength({ min: 1 })
		.trim(),
	body('image').isURL(),
	body('description')
		.isLength({ min: 5, max: 400 })
		.trim()
	],
	isAuth,
	adminController.postEditCostume
);

// /admin/delete-costume => POST
router.post('/delete-costume', isAuth, adminController.postDeleteCostume);


/**
 * Define a schema for Rentals
 * @swagger
 * components:
 *  schemas:
 *      Rentals:
 *          type: object
 *          required:
 *              -orderId
 *              -orderDate
 *              -userId
 *              -rentals
 *          properties:
 *              orderId:
 *                  type: String
 *                  description: The auto-generated id of the order
 *              orderDate:
 *                  type: Date
 *                  description: date the order was placed
 *              userId:
 *                  type: String
 *                  description: id of user who placed the order
 *              rentals:
 *                  type: Array
 *                  description: list of rentals in order
 *          example:
 *              orderId: 4367489
 *              orderDate: 10/31/2022
 *              userId: 4326
 *              rentals: [Gandalf the Grey, Tin Man, Queen Elizabeth]          
 */

/**
 * Define a schema for Rental
 * @swagger
 * components:
 *  schemas:
 *      Rental:
 *          type: object
 *          required:
 *              -rentalId
 *              -returnDate
 *              -userId
 *              -costumeId
 *              -costumeName
 *          properties:
 *              rentalId:
 *                  type: String
 *                  description: The auto-generated id of the rental
 *              returnDate:
 *                  type: Date
 *                  description: date the order was placed
 *              userId:
 *                  type: String
 *                  description: id of user who has the rental
 *              costumeId:
 *                  type: String
 *                  description: id of costume in rental
 *              costumeName:
 *                  type: String
 *                  description: name of the costume in rental
 *          example:
 *              rentalId: 94830495
 *              returnDate: 11/31/2022
 *              userId: 4326
 *              costumeId: 43256
 *              costumeName: Gandalf the Grey      
 */

/**
 * @swagger
 * tags:
 *  name: Admin
 *  description: The Admin managing api
 * 
 */


/**
 * GET routes
 * @swagger
 * 
 * admin/costumes:
 *      get:
 *          summary: Gets a list of all the costumes
 *          tags: [Admin]
 *          responses:
 *              200:
 *                  description: List of costumes
 *                  content:
 *                      application/json:
 *                          schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Costume'
 * 
 * admin/edit-costume/{costumeId}:
 *      get:
 *          summary: Get single costume detail for logged in user that created that costume
 *          tags: [Admin]
 *          parameters:
 *            - in: path
 *              name: costumeId
 *              schema:
 *                  type: string
 *              required: true
 *              description: This is the costume id
 *          responses:
 *              200:
 *                  description: Get costume information by Id for logged in user
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Costume'
 *              404:
 *                  description: The costume was not found
 * 
 */

/**
 * POST routes
 * @swagger
 * 
 * admin/edit-costume:
 *      post:
 *          summary: edit details of existing costume that the user has created
 *          tags: [Admin]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Costume'
 *          responses:
 *              200:
 *                  description: The costume was successfully changed
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Costume'
 *              500:
 *                  description: There was a server error
 * 
 * admin/add-costume:
 *      post:
 *          summary: create new costume entry in database
 *          tags: [Admin]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Costume'
 *          responses:
 *              200:
 *                  description: The costume was successfully added to the database
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Costume'
 *              500:
 *                  description: There was a server error
 * 
 * admin/delete-costume:
 *      post:
 *          summary: submit costumes and create rental order
 *          tags: [Admin]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Rental'
 *          responses:
 *              200:
 *                  description: The costume was successfully deleted from the database
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Costume'
 *              500:
 *                  description: There was a server error
 * 
 * /cancel-rental:
 *      post:
 *          summary: submit cancellation request for rental that has not yet begun
 *          tags: [Admin]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Rental'
 *          responses:
 *              200:
 *                  description: The cancellation request was successfully submitted
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Rental'
 *              500:
 *                  description: There was a server error
 */

/**
 * DELETE routes
 * @swagger
 * 
 * admin/delete-costume/{costumeId}:
 *      delete:
 *          summary: delete costume that admin has created by id
 *          tags: [Admin]
 *          parameters:
 *            - in: path
 *              name: costumeId
 *              schema:
 *                  type: string
 *              required: true
 *              description: This is the costume id
 *          responses:
 *              204:
 *                  description: Deleted
 *              404:
 *                  description: id not found
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: there was a server error
 * 
 */
//Place routes here


module.exports = router;