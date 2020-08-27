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
        beforeEach(() => {
            schoolGateway.create.and.returnValue({ insertId: 1337 });
        });

        it('should call school entity setters', async () => {
            await schoolController.create({});

            expect(school.setLevel).toHaveBeenCalled();
            expect(school.setCommunity).toHaveBeenCalled();
            expect(school.setStreet).toHaveBeenCalled();
            expect(school.setPostalCode).toHaveBeenCalled();
            expect(school.setCity).toHaveBeenCalled();
            expect(school.setWebsite).toHaveBeenCalled();
            expect(school.setEmail).toHaveBeenCalled();
            expect(school.setTelephone).toHaveBeenCalled();
            expect(school.setMunicipality).toHaveBeenCalled();
            expect(school.getPlainObject).toHaveBeenCalled();
        });

        it('should set school data properly', async () => {
            await schoolController.create({
                level: 'fake-level',
                community: 'fake-community',
                street: 'fake-street',
                postalCode: 1488,
                city: 'fake-city',
                website: 'fake-website',
                email: 'fake-email',
                telephone: 88005553535,
                municipality: 'fake-municipality'
            });

            expect(school.setLevel).toHaveBeenCalledWith('fake-level');
            expect(school.setCommunity).toHaveBeenCalledWith('fake-community');
            expect(school.setStreet).toHaveBeenCalledWith('fake-street');
            expect(school.setPostalCode).toHaveBeenCalledWith(1488);
            expect(school.setCity).toHaveBeenCalledWith('fake-city');
            expect(school.setWebsite).toHaveBeenCalledWith('fake-website');
            expect(school.setEmail).toHaveBeenCalledWith('fake-email');
            expect(school.setTelephone).toHaveBeenCalledWith(88005553535);
            expect(school.setMunicipality).toHaveBeenCalledWith('fake-municipality');
            expect(school.getPlainObject).toHaveBeenCalled();
        });

        it('should create new school entity and put it in DB', async () => {
            school.getPlainObject.and.returnValue({ dummy: 'school' });

            await schoolController.create({});
            expect(schoolGateway.read).not.toHaveBeenCalled();
            expect(schoolGateway.update).not.toHaveBeenCalled();
            expect(schoolGateway.create).toHaveBeenCalledWith({ dummy: 'school' });
        });

        it('should create new school entity with buildings and put it in DB', async () => {
            school.getPlainObject.and.returnValue({ dummy: 'school' });

            await schoolController.create({ schoolBuildings: ['fake-building-name'] });
            expect(schoolGateway.read).not.toHaveBeenCalled();
            expect(schoolGateway.update).not.toHaveBeenCalled();
            expect(schoolGateway.create).toHaveBeenCalledWith({ dummy: 'school' });
            expect(schoolBuildingsGateway.setBuilding).toHaveBeenCalledWith(1337, 'fake-building-name');
        });

        it('should update existing school entity', async () => {
            school.getPlainObject.and.returnValue({ dummy: 'data' });
            schoolGateway.read.withArgs(228).and.returnValue(true);
            await schoolController.create({ id: 228 });
            
            expect(schoolGateway.update).toHaveBeenCalledWith({ dummy: 'data', id: 228 });
        });

        it('should update existing school entity and set its buildings', async () => {
            school.getPlainObject.and.returnValue({ dummy: 'data' });
            schoolGateway.read.withArgs(228).and.returnValue(true);
            await schoolController.create({ id: 228, schoolBuildings: ['fake-building'] });
            
            expect(schoolGateway.update).toHaveBeenCalledWith({ dummy: 'data', id: 228 });
            expect(schoolBuildingsGateway.setBuilding).toHaveBeenCalledWith(228, 'fake-building');
        });
    });
});
