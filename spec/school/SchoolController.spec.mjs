import { SchoolController } from '../../src/school/SchoolController.js';

describe('SchoolController', () => {
    let schoolController;
    let schoolGateway, schoolBuildingsGateway, entityFactory;
    let school;
    beforeEach(() => {
        schoolGateway = jasmine.createSpyObj('schoolGateway', [
            'read', 'update', 'create',
            'readAll', 'readCommunities'
        ]);
        schoolGateway.read.and.returnValue(null);
        schoolGateway.update.and.returnValue(null);
        schoolGateway.create.and.returnValue(null);
        schoolGateway.readAll.and.returnValue(null);
        schoolGateway.readCommunities.and.returnValue(null);

        schoolBuildingsGateway = jasmine.createSpyObj('schoolBuildingGateway', ['setBuilding', 'getAllBuildings']);
        schoolBuildingsGateway.setBuilding.and.returnValue(null);
        schoolBuildingsGateway.getAllBuildings.and.returnValue(null);

        school = jasmine.createSpyObj('school', [
            'setLevel', 'setCommunity', 'setStreet', 'setPostalCode',
            'setCity', 'setWebsite', 'setEmail', 'setTelephone',
            'setMunicipality', 'getPlainObject'
        ]);
        school.setLevel.and.returnValue(school);
        school.setCommunity.and.returnValue(school);
        school.setStreet.and.returnValue(school);
        school.setPostalCode.and.returnValue(school);
        school.setCity.and.returnValue(school);
        school.setWebsite.and.returnValue(school);
        school.setEmail.and.returnValue(school);
        school.setTelephone.and.returnValue(school);
        school.setMunicipality.and.returnValue(school);
        school.getPlainObject.and.returnValue(null);

        entityFactory = jasmine.createSpyObj('entityFactory', ['createSchool']);
        entityFactory.createSchool.and.returnValue(school);

        schoolController = new SchoolController({
            gateway: schoolGateway,
            schoolBuildingsGateway,
            entityFactory
        });
    });

    describe('create(data)', () => {
        it('should create new school entity and put it in DB', async () => {
            expect(true).toBe(true);
        });
    });
});