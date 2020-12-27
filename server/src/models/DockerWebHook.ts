export interface DockerWebHook {
    callbackUrl: string;
    pushData: PushData;
    repository: Repository;
}

interface PushData {
    images: string[];
    pushedAt: number;
    pusher: string;
    tag: string;
}

interface Repository {
    commentCount: number;
    dateCreated: number;
    description: string;
    dockerfile: string;
    fullDescription: string;
    isOfficial: boolean;
    isPrivate: boolean;
    isTrusted: boolean;
    name: string;
    namespace: string;
    owner: string;
    repoName: string;
    repoUrl: string;
    starCount: number;
    status: string;
}

export function mapDockerWebHook(reqBody: any): DockerWebHook {
    const pushData = reqBody.push_data;
    const repository = reqBody.repository;

    return {
        callbackUrl: reqBody.callback_url,
        pushData: {
            images: pushData.images,
            pushedAt: pushData.pushed_at,
            pusher: pushData.pusher,
            tag: pushData.tag,
        },
        repository: {
            commentCount: repository.comment_count,
            dateCreated: repository.date_created,
            description: repository.description,
            dockerfile: repository.dockerfile,
            fullDescription: repository.full_description,
            isOfficial: repository.is_official,
            isPrivate: repository.is_private,
            isTrusted: repository.is_trusted,
            name: repository.name,
            namespace: repository.namespace,
            owner: repository.owner,
            repoName: repository.repo_name,
            repoUrl: repository.repo_url,
            starCount: repository.star_count,
            status: repository.status,
        },
    };
}
