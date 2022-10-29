export abstract class BaseUseCase<Repository> {
  protected readonly repository: Repository

  constructor (repository: Repository) {
    this.repository = repository
  }
}
