// tests/imageService.test.js

// Mock the 'fs' module
jest.mock('fs');

const {
	createImage,
	saveMultipleImages,
	getImageById,
	deleteImageById,
	readImage
} = require('../../services/image.service');
const { Image } = require('../../models');
const ApiError = require('../../utils/ApiError');


describe('imageService', () => {
	describe('createImage', () => {
		it('should create a new image', async () => {
			const image = {
				filename: 'example.jpg',
				path: '/path/to/image'
			};
			const mockCreatedImage = { _id: '123', ...image };

			// Mock the static method 'create' of Image model
			const createSpy = jest.spyOn(Image, 'create');
			createSpy.mockResolvedValue(mockCreatedImage);

			const result = await createImage(image);

			expect(createSpy).toHaveBeenCalledWith(image);
			expect(result).toEqual(mockCreatedImage);
		});
	});

	describe('saveMultipleImages', () => {
		it('should save multiple images and return inserted IDs', async () => {
			// Define sample input images and expected output
			const mockImages = [
				{ filename: 'image1.jpg', path: '/path/to/image1' },
				{ filename: 'image2.jpg', path: '/path/to/image2' }
			];
			const mockInsertedIds = ['123', '456'];
			const mockInsertedImages = [
				{ _id: mockInsertedIds[0] },
				{ _id: mockInsertedIds[1] }
			];

			// Mock the behavior of the `saveImages` function to resolve with mockInsertedIds
			const saveImagesSpy = jest.spyOn(Image, 'insertMany');
			saveImagesSpy.mockResolvedValue(mockInsertedImages);

			// Call the saveMultipleImages function with the mockImages
			const result = await saveMultipleImages(mockImages);

			// Assert that saveImages was called with the expected image body
			expect(saveImagesSpy).toHaveBeenCalledWith(expect.any(Array));

			// Assert that the result matches the expected mockInsertedIds
			expect(result).toEqual(mockInsertedIds);
		});
	});

	describe('getImageById', () => {
		it('should find an image by ID', async () => {
			const mockImageId = '123';
			const mockImage = {
				_id: mockImageId,
				filename: 'example.jpg',
				path: '/path/to/image'
			};

			// Mock the static method 'findById' of Image model
			const findByIdSpy = jest.spyOn(Image, 'findById');
			findByIdSpy.mockReturnValue(mockImage);

			const result = await getImageById(mockImageId);

			expect(findByIdSpy).toHaveBeenCalledWith(mockImageId);
			expect(result).toEqual(mockImage);
		});
	});

	describe('deleteImageById', () => {
		it('should delete an image by ID', async () => {
			const mockImageId = '123';
			const mockImage = {
				_id: mockImageId,
				filename: 'example.jpg',
				path: '/path/to/image'
			};

			// Mock the static method 'findById' of Image model
			const findByIdSpy = jest.spyOn(Image, 'findById');
			findByIdSpy.mockResolvedValue(mockImage);

			// Mock the instance method 'delete'
			const deleteSpy = jest.spyOn(Image, 'delete');
			deleteSpy.mockResolvedValue(mockImage);

			const result = await deleteImageById(mockImageId);

			expect(findByIdSpy).toHaveBeenCalledWith(mockImageId);
			expect(deleteSpy).toHaveBeenCalled();
			expect(result).toEqual(mockImage);
		});

		it('should throw an error if the image is not found', async () => {
			const mockImageId = '123';

			// Mock the static method 'findById' of Image model to return null
			const findByIdSpy = jest.spyOn(Image, 'findById');
			findByIdSpy.mockResolvedValue(null);

			await expect(deleteImageById(mockImageId)).rejects.toThrow(ApiError);
		});
	});

	describe('readImage', () => {
		it('should read the contents of an image file', () => {
			const mockFilename = 'example.jpg';
			const mockImageContents = `Contents of ${mockFilename}`;

			// Mock 'fs.readFileSync' function
			// eslint-disable-next-line global-require
			jest.spyOn(require('fs'), 'readFileSync').mockReturnValue(mockImageContents);

			const result = readImage(mockFilename);

			expect(result).toEqual(mockImageContents);
		});
	});
});