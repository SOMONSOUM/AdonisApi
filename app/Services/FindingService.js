const ResourceNotExistException = use('App/Exceptions/ResourceNotExistException')

class FindingService {
    verifyFinding(resource) {
        if (!resource) {
            throw new ResourceNotExistException()
        }
    }
}

module.exports = new FindingService()