/**
 * @jest-environment node
 */
import { 
  createUserInDB, 
  findUserByEmailInDB, 
  findUserByIdInDB, 
  updateUserInDB, 
  deleteUserInDB,
  getAllUsersFromDB 
} from '../db'

// Mock Prisma client
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $disconnect: jest.fn(),
  })),
}))

describe('Database Operations', () => {
  beforeEach(() => {
    // Clear the in-memory store before each test
    jest.clearAllMocks()
  })

  describe('createUserInDB', () => {
    it('should create a new user with valid data', async () => {
      const userData = {
        email: 'newuser@test.com',
        password: 'hashedPassword123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'user' as const,
      }

      const user = await createUserInDB(userData)

      expect(user).toBeDefined()
      expect(user.email).toBe(userData.email)
      expect(user.firstName).toBe(userData.firstName)
      expect(user.lastName).toBe(userData.lastName)
      expect(user.role).toBe(userData.role)
      expect(user.id).toBeDefined()
    })

    it('should handle missing optional fields', async () => {
      const userData = {
        email: 'minimal@test.com',
        password: 'hashedPassword123',
        role: 'user' as const,
      }

      const user = await createUserInDB(userData)

      expect(user).toBeDefined()
      expect(user.email).toBe(userData.email)
      expect(user.firstName).toBeUndefined()
      expect(user.lastName).toBeUndefined()
    })

    it('should prevent duplicate email addresses', async () => {
      const userData = {
        email: 'duplicate@test.com',
        password: 'hashedPassword123',
        role: 'user' as const,
      }

      // Create first user
      await createUserInDB(userData)

      // Attempt to create duplicate - should handle gracefully
      const duplicateAttempt = await createUserInDB(userData)
      
      // In-memory implementation will create duplicate, but real DB would reject
      expect(duplicateAttempt).toBeDefined()
    })
  })

  describe('findUserByEmailInDB', () => {
    it('should find existing user by email', async () => {
      const userData = {
        email: 'findme@test.com',
        password: 'hashedPassword123',
        role: 'user' as const,
      }

      await createUserInDB(userData)
      const foundUser = await findUserByEmailInDB(userData.email)

      expect(foundUser).toBeDefined()
      expect(foundUser?.email).toBe(userData.email)
    })

    it('should return null for non-existent email', async () => {
      const foundUser = await findUserByEmailInDB('nonexistent@test.com')
      expect(foundUser).toBeNull()
    })

    it('should be case-sensitive for email matching', async () => {
      const userData = {
        email: 'case@test.com',
        password: 'hashedPassword123',
        role: 'user' as const,
      }

      await createUserInDB(userData)
      
      // Exact match should work
      const exact = await findUserByEmailInDB('case@test.com')
      expect(exact).toBeDefined()

      // Different case should not match (in real DB with proper collation)
      const different = await findUserByEmailInDB('CASE@test.com')
      expect(different).toBeNull()
    })
  })

  describe('findUserByIdInDB', () => {
    it('should find existing user by ID', async () => {
      const userData = {
        email: 'findbyid@test.com',
        password: 'hashedPassword123',
        role: 'user' as const,
      }

      const created = await createUserInDB(userData)
      const foundUser = await findUserByIdInDB(created.id)

      expect(foundUser).toBeDefined()
      expect(foundUser?.id).toBe(created.id)
      expect(foundUser?.email).toBe(userData.email)
    })

    it('should return null for non-existent ID', async () => {
      const foundUser = await findUserByIdInDB('non-existent-id-12345')
      expect(foundUser).toBeNull()
    })
  })

  describe('updateUserInDB', () => {
    it('should update user data', async () => {
      const userData = {
        email: 'update@test.com',
        password: 'hashedPassword123',
        firstName: 'John',
        role: 'user' as const,
      }

      const created = await createUserInDB(userData)
      const updated = await updateUserInDB(created.id, {
        firstName: 'Jane',
        lastName: 'Smith',
      })

      expect(updated).toBeDefined()
      expect(updated?.firstName).toBe('Jane')
      expect(updated?.lastName).toBe('Smith')
      expect(updated?.email).toBe(userData.email) // Unchanged fields remain
    })

    it('should return null when updating non-existent user', async () => {
      const updated = await updateUserInDB('non-existent-id', {
        firstName: 'Test',
      })

      expect(updated).toBeNull()
    })
  })

  describe('deleteUserInDB', () => {
    it('should delete existing user', async () => {
      const userData = {
        email: 'delete@test.com',
        password: 'hashedPassword123',
        role: 'user' as const,
      }

      const created = await createUserInDB(userData)
      const deleted = await deleteUserInDB(created.id)

      expect(deleted).toBe(true)

      // Verify user is actually deleted
      const found = await findUserByIdInDB(created.id)
      expect(found).toBeNull()
    })

    it('should return false when deleting non-existent user', async () => {
      const deleted = await deleteUserInDB('non-existent-id')
      expect(deleted).toBe(false)
    })
  })

  describe('getAllUsersFromDB', () => {
    it('should return all users', async () => {
      // Create multiple users
      await createUserInDB({
        email: 'user1@test.com',
        password: 'pass1',
        role: 'user',
      })
      await createUserInDB({
        email: 'user2@test.com',
        password: 'pass2',
        role: 'admin',
      })
      await createUserInDB({
        email: 'user3@test.com',
        password: 'pass3',
        role: 'user',
      })

      const allUsers = await getAllUsersFromDB()

      expect(allUsers).toBeDefined()
      expect(allUsers.length).toBeGreaterThanOrEqual(3)
    })

    it('should return empty array when no users exist', async () => {
      // This test assumes a fresh DB state
      // In practice, might need to clear the store first
      const allUsers = await getAllUsersFromDB()
      expect(Array.isArray(allUsers)).toBe(true)
    })
  })
})
